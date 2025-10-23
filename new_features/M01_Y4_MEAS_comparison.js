/**
 * M01_Y4_MEAS - Year 4 Measurement: Compare Money in Pounds and Pence
 * 
 * Curriculum: "compare different measures, including money in pounds and pence"
 */

import {
    randomChoice,
    shuffleArray
} from './helpers/M01_measurementHelpers.js';

/**
 * Random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random money amount in pounds
 * @param {number} min - Minimum pounds
 * @param {number} max - Maximum pounds
 * @param {boolean} allowDecimals - Whether to include decimal amounts
 * @returns {string} Formatted money string (e.g., "£2.50")
 */
function generatePoundsAmount(min, max, allowDecimals = false) {
    const pounds = randomInt(min, max);
    
    if (allowDecimals && Math.random() < 0.5) {
        // Add pence as decimals (0.25, 0.50, 0.75)
        const penceOptions = [0, 25, 50, 75];
        const pence = randomChoice(penceOptions);
        
        if (pence === 0) {
            return `£${pounds}`;
        } else {
            return `£${pounds}.${pence}`;
        }
    }
    
    return `£${pounds}`;
}

/**
 * Generate a random money amount in pence only
 * @param {number} min - Minimum pence
 * @param {number} max - Maximum pence
 * @returns {string} Formatted money string (e.g., "250p")
 */
function generatePenceAmount(min, max) {
    const pence = randomInt(min, max);
    return `${pence}p`;
}

/**
 * Convert money amount to pence for comparison
 * @param {string} amount - Money amount (e.g., "£2.50" or "250p")
 * @returns {number} Amount in pence
 */
function toPence(amount) {
    if (amount.startsWith('£')) {
        // Remove £ and convert to pence
        const value = parseFloat(amount.substring(1));
        return Math.round(value * 100);
    } else if (amount.endsWith('p')) {
        // Remove p and parse
        return parseInt(amount.substring(0, amount.length - 1));
    }
    return 0;
}

/**
 * Get comparison symbol between two values
 */
function getComparisonSymbol(val1, val2) {
    if (val1 > val2) return '>';
    if (val1 < val2) return '<';
    return '=';
}

/**
 * Generate direct money comparison question
 */
function generateDirectComparison(params, level) {
    const allowDecimals = level >= 2;
    
    // Generate two money amounts in different formats
    const usePoundsFirst = Math.random() < 0.5;
    
    let amount1, amount2;
    
    if (usePoundsFirst) {
        amount1 = generatePoundsAmount(params.min_pounds, params.max_pounds, allowDecimals);
        amount2 = generatePenceAmount(params.min_pence, params.max_pence);
    } else {
        amount1 = generatePenceAmount(params.min_pence, params.max_pence);
        amount2 = generatePoundsAmount(params.min_pounds, params.max_pounds, allowDecimals);
    }
    
    // Convert to pence for comparison
    const pence1 = toPence(amount1);
    const pence2 = toPence(amount2);
    
    // Determine which is more/less
    const larger = pence1 > pence2 ? amount1 : amount2;
    const smaller = pence1 < pence2 ? amount1 : amount2;
    
    // Randomly ask for more or less
    const askingForMore = Math.random() < 0.5;
    const questionWord = askingForMore ? 'more' : 'less';
    const correctAnswer = askingForMore ? larger : smaller;
    
    const text = `Which is ${questionWord}: ${amount1} or ${amount2}?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray([amount1, amount2]),
        module: 'M01_Y4_MEAS',
        operation: 'direct_comparison',
        level
    };
}

/**
 * Generate complete statement question
 */
function generateCompleteStatement(params, level) {
    const allowDecimals = level >= 2;
    
    // Generate two money amounts in different formats
    const amount1 = generatePoundsAmount(params.min_pounds, params.max_pounds, allowDecimals);
    const amount2 = generatePenceAmount(params.min_pence, params.max_pence);
    
    // Convert to pence for comparison
    const pence1 = toPence(amount1);
    const pence2 = toPence(amount2);
    
    const correctSymbol = getComparisonSymbol(pence1, pence2);
    
    const text = `Complete: ${amount1} ___ ${amount2}`;
    const hint = `Remember: £1 = 100p. Convert both amounts to the same unit to compare.`;
    
    return {
        text,
        type: 'text_input',
        answer: correctSymbol,
        hint,
        module: 'M01_Y4_MEAS',
        operation: 'complete_statement',
        level
    };
}

/**
 * Generate ordering question
 */
function generateOrdering(params, level) {
    const allowDecimals = level >= 2;
    const count = level >= 3 ? 4 : 3;
    
    const amounts = [];
    
    // Generate mixed money amounts
    for (let i = 0; i < count; i++) {
        const usePounds = Math.random() < 0.5;
        
        let amount;
        if (usePounds) {
            amount = generatePoundsAmount(params.min_pounds, params.max_pounds, allowDecimals);
        } else {
            amount = generatePenceAmount(params.min_pence, params.max_pence);
        }
        
        amounts.push({
            display: amount,
            pence: toPence(amount)
        });
    }
    
    // Ensure all amounts are different
    const penceValues = new Set(amounts.map(a => a.pence));
    if (penceValues.size < count) {
        // Regenerate if we have duplicates
        return generateOrdering(params, level);
    }
    
    // Sort by pence value
    const sorted = [...amounts].sort((a, b) => a.pence - b.pence);
    
    // Shuffle for presentation
    const shuffledText = shuffleArray(amounts.map(a => a.display)).join(', ');
    
    // Ask for different positions
    const positions = ['FIRST', 'SECOND', 'LAST'];
    const position = randomChoice(positions.slice(0, Math.min(count, 3)));
    
    let correctAnswer;
    if (position === 'FIRST') {
        correctAnswer = sorted[0].display;
    } else if (position === 'SECOND') {
        correctAnswer = sorted[1].display;
    } else { // LAST
        correctAnswer = sorted[sorted.length - 1].display;
    }
    
    const text = `Put these in order from smallest to largest: ${shuffledText}. Which comes ${position}?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray(amounts.map(a => a.display)),
        module: 'M01_Y4_MEAS',
        operation: 'ordering',
        level
    };
}

/**
 * Generate context problem with money
 */
function generateContextProblem(params, level) {
    const allowDecimals = level >= 2;
    
    // Generate two money amounts
    const amount1 = generatePoundsAmount(params.min_pounds, params.max_pounds, allowDecimals);
    const amount2 = generatePenceAmount(params.min_pence, params.max_pence);
    
    // Convert to pence
    const pence1 = toPence(amount1);
    const pence2 = toPence(amount2);
    
    // Create scenarios
    const names = ['Tom', 'Sarah', 'Alex', 'Maya'];
    const name1 = randomChoice(names);
    const name2 = randomChoice(names.filter(n => n !== name1));
    
    // Determine who has more
    const personWithMore = pence1 > pence2 ? name1 : name2;
    const personWithLess = pence1 < pence2 ? name1 : name2;
    
    // Create different question types
    const scenarios = [
        {
            setup: `${name1} has ${amount1}. ${name2} has ${amount2}.`,
            question: `Who has more money?`,
            answer: personWithMore
        },
        {
            setup: `${name1} has ${amount1}. ${name2} has ${amount2}.`,
            question: `Who has less money?`,
            answer: personWithLess
        },
        {
            setup: `${name1} saved ${amount1}. ${name2} saved ${amount2}.`,
            question: `Who saved more?`,
            answer: personWithMore
        }
    ];
    
    const scenario = randomChoice(scenarios);
    const text = `${scenario.setup} ${scenario.question}`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: scenario.answer,
        options: shuffleArray([name1, name2]),
        module: 'M01_Y4_MEAS',
        operation: 'context_problem',
        level
    };
}

/**
 * Generate a Year 4 measurement comparison question focusing on money
 * @param {object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {object} Question object
 */
export function generateQuestion(params, level) {
    // Select operation
    const operation = randomChoice(params.operations);
    
    // Generate question based on operation
    switch (operation) {
        case 'direct_comparison':
            return generateDirectComparison(params, level);
            
        case 'complete_statement':
            return generateCompleteStatement(params, level);
            
        case 'ordering':
            return generateOrdering(params, level);
            
        case 'context_problem':
            return generateContextProblem(params, level);
            
        default:
            return generateDirectComparison(params, level);
    }
}

export default {
    moduleId: 'M01_Y4_MEAS',
    generate: generateQuestion
};
