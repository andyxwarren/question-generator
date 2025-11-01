/**
 * M02_Y4_MEAS: Estimate Measures
 * Year 4 - Estimate different measures, including money in pounds and pence
 */

export function generateQuestion(params, level) {
    const operation = params.operations[Math.floor(Math.random() * params.operations.length)];

    switch (operation) {
        case 'estimate_measurement':
            return generateEstimateMeasurement(params, level);
        case 'choose_reasonable_estimate':
            return generateChooseReasonableEstimate(params, level);
        case 'estimate_money':
            return generateEstimateMoney(params, level);
        case 'compare_estimates':
            return generateCompareEstimates(params, level);
        case 'estimate_from_context':
            return generateEstimateFromContext(params, level);
        default:
            return generateEstimateMeasurement(params, level);
    }
}

function generateEstimateMeasurement(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const objects = params.estimation_ranges[measureType].objects;

    const object = objects[Math.floor(Math.random() * objects.length)];

    const estimates = {
        // Length estimates
        'pencil': { value: 15, unit: 'cm', options: [5, 15, 50, 150] },
        'book': { value: 25, unit: 'cm', options: [10, 25, 100, 250] },
        'desk': { value: 120, unit: 'cm', options: [30, 60, 120, 500] },
        'room width': { value: 4, unit: 'm', options: [1, 4, 20, 100] },
        'car': { value: 4, unit: 'm', options: [1, 4, 10, 50] },
        'football pitch': { value: 100, unit: 'm', options: [10, 50, 100, 500] },
        'hair width': { value: 1, unit: 'mm', options: [1, 10, 100, 1000] },
        'town': { value: 5, unit: 'km', options: [500, 1, 5, 50] },

        // Mass estimates
        'apple': { value: 150, unit: 'g', options: [15, 150, 1500, 15000] },
        'bag of sugar': { value: 1, unit: 'kg', options: [100, 500, 1, 5] },
        'textbook': { value: 500, unit: 'g', options: [50, 500, 5000, 50000] },
        'laptop': { value: 2, unit: 'kg', options: [200, 1, 2, 10] },
        'child': { value: 30, unit: 'kg', options: [3, 10, 30, 100] },
        'coin': { value: 5, unit: 'g', options: [1, 5, 50, 500] },
        'adult': { value: 70, unit: 'kg', options: [7, 30, 70, 200] },
        'feather': { value: 1, unit: 'g', options: [1, 10, 100, 1000] },

        // Capacity estimates
        'cup': { value: 250, unit: 'ml', options: [25, 250, 2500, 25000] },
        'bottle': { value: 500, unit: 'ml', options: [50, 500, 5000, 50000] },
        'bucket': { value: 10, unit: 'l', options: [1, 10, 100, 1000] },
        'bath': { value: 150, unit: 'l', options: [15, 50, 150, 1500] },
        'swimming pool': { value: 50000, unit: 'l', options: [500, 5000, 50000, 500000] },
        'spoon': { value: 15, unit: 'ml', options: [1, 15, 150, 1500] },
        'teaspoon': { value: 5, unit: 'ml', options: [1, 5, 50, 500] },
        'lake': { value: 1000000, unit: 'l', options: [1000, 10000, 1000000, 10000000] },

        // Time estimates
        'blink': { value: 1, unit: 'second', options: [1, 10, 60, 600] },
        'brush teeth': { value: 2, unit: 'minutes', options: [10, 2, 30, 120] },
        'lesson': { value: 60, unit: 'minutes', options: [5, 15, 60, 240] },
        'sleep': { value: 10, unit: 'hours', options: [1, 5, 10, 24] },
        'day': { value: 24, unit: 'hours', options: [6, 12, 24, 48] },
        'heartbeat': { value: 1, unit: 'second', options: [1, 10, 60, 600] },
        'school day': { value: 6, unit: 'hours', options: [1, 6, 12, 24] },
        'week': { value: 7, unit: 'days', options: [1, 7, 14, 30] }
    };

    const estimate = estimates[object];
    if (!estimate) {
        // Fallback to a known object
        return generateEstimateMoney(params, level);
    }

    const correctAnswer = `${estimate.value} ${estimate.unit}`;
    const options = estimate.options.map(v => `${v} ${estimate.unit}`);

    const articlePrefix = ['apple', 'adult'].includes(object) ? 'an' : 'a';
    const objectText = ['car', 'laptop', 'town', 'hair width'].includes(object) ? object :
                      object === 'swimming pool' ? 'swimming pool' :
                      object === 'football pitch' ? 'football pitch' :
                      `${articlePrefix} ${object}`;

    return {
        text: `Estimate: What is a reasonable ${measureType} for ${objectText}?`,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        module: 'M02_Y4_MEAS',
        level: level
    };
}

function generateChooseReasonableEstimate(params, level) {
    return generateEstimateMeasurement(params, level); // Similar operation
}

function generateEstimateMoney(params, level) {
    // Items with relatively standardized prices that Year 4 students would recognize
    // Prices are typical UK values as of 2024
    const items = {
        // Small items - pence (more standardized than generic "sweet" or "snack")
        'packet of crisps': { value: 70, unit: 'p', options: [7, 70, 700, 7000] },
        'chocolate bar': { value: 80, unit: 'p', options: [8, 80, 800, 8000] },
        'can of drink': { value: 90, unit: 'p', options: [9, 90, 900, 9000] },
        'apple': { value: 50, unit: 'p', options: [5, 50, 500, 5000] },
        'banana': { value: 30, unit: 'p', options: [3, 30, 300, 3000] },

        // Common items - low pounds (more specific than "book" or "toy")
        'loaf of bread': { value: 1.20, unit: '£', options: [0.12, 1.20, 12, 120] },
        'litre of milk': { value: 1.50, unit: '£', options: [0.15, 1.50, 15, 150] },
        'bus ticket': { value: 2.50, unit: '£', options: [0.25, 2.50, 25, 250] },
        'cinema ticket': { value: 8, unit: '£', options: [0.80, 8, 80, 800] },
        'children\'s book': { value: 7, unit: '£', options: [0.70, 7, 70, 700] },
        'comic book': { value: 4, unit: '£', options: [0.40, 4, 40, 400] },

        // Mid-range items
        'football': { value: 15, unit: '£', options: [1.50, 15, 150, 1500] },
        'school shoes': { value: 30, unit: '£', options: [3, 30, 300, 3000] },
        'video game': { value: 40, unit: '£', options: [4, 40, 400, 4000] },

        // Higher value items (only for higher levels)
        'bicycle': { value: 150, unit: '£', options: [15, 150, 1500, 15000] },
        'tablet computer': { value: 300, unit: '£', options: [30, 300, 3000, 30000] }
    };

    // Select appropriate items based on level
    let availableItems;
    if (level === 1) {
        // Level 1: Only small pence items
        availableItems = ['packet of crisps', 'chocolate bar', 'can of drink', 'apple', 'banana'];
    } else if (level === 2) {
        // Level 2: Pence and low pound items
        availableItems = ['chocolate bar', 'can of drink', 'apple', 'loaf of bread', 'litre of milk', 'bus ticket', 'children\'s book', 'comic book'];
    } else if (level === 3) {
        // Level 3: Wide range
        availableItems = ['can of drink', 'loaf of bread', 'bus ticket', 'cinema ticket', 'children\'s book', 'football', 'school shoes', 'video game'];
    } else {
        // Level 4: All items including high value
        availableItems = Object.keys(items);
    }

    const object = availableItems[Math.floor(Math.random() * availableItems.length)];
    const item = items[object];

    // Format currency correctly: £ before number for pounds, p after for pence
    const formatCurrency = (value, unit) => {
        if (unit === 'p') {
            return `${value}p`;
        } else {
            // For pounds, handle decimals properly
            const formatted = typeof value === 'number' && value % 1 !== 0
                ? value.toFixed(2)
                : value.toString();
            return `£${formatted}`;
        }
    };

    const correctAnswer = formatCurrency(item.value, item.unit);
    const options = item.options.map(v => formatCurrency(v, item.unit));

    // Handle article prefix correctly
    const articlePrefix = ['apple'].includes(object) ? 'an' : 'a';
    const objectText = object;

    return {
        text: `Estimate: How much does ${articlePrefix} ${objectText} cost?`,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        module: 'M02_Y4_MEAS',
        level: level
    };
}

function generateCompareEstimates(params, level) {
    const comparisons = [
        {
            question: 'Which is a better estimate for the length of a classroom: 8 metres or 80 metres?',
            answer: '8 metres',
            options: ['8 metres', '80 metres']
        },
        {
            question: 'Which is a better estimate for the mass of a textbook: 50 grams or 500 grams?',
            answer: '500 grams',
            options: ['50 grams', '500 grams']
        },
        {
            question: 'Which is a better estimate for the capacity of a bath: 15 litres or 150 litres?',
            answer: '150 litres',
            options: ['15 litres', '150 litres']
        },
        {
            question: 'Which is a better estimate for the time to brush your teeth: 20 seconds or 2 minutes?',
            answer: '2 minutes',
            options: ['20 seconds', '2 minutes']
        },
        {
            question: 'Which is a better estimate for the cost of a packet of crisps: 70p or £7?',
            answer: '70p',
            options: ['70p', '£7']
        },
        {
            question: 'Which is a better estimate for the cost of a loaf of bread: £1.20 or £12?',
            answer: '£1.20',
            options: ['£1.20', '£12']
        },
        {
            question: 'Which is a better estimate for the height of a door: 2 metres or 20 metres?',
            answer: '2 metres',
            options: ['2 metres', '20 metres']
        },
        {
            question: 'Which is a better estimate for the mass of a bag of apples: 200 grams or 2 kilograms?',
            answer: '2 kilograms',
            options: ['200 grams', '2 kilograms']
        },
        {
            question: 'Which is a better estimate for the cost of a bus ticket: £2.50 or £25?',
            answer: '£2.50',
            options: ['£2.50', '£25']
        },
        {
            question: 'Which is a better estimate for the width of a football pitch: 50 metres or 500 metres?',
            answer: '50 metres',
            options: ['50 metres', '500 metres']
        }
    ];

    const comparison = comparisons[Math.floor(Math.random() * comparisons.length)];

    return {
        text: comparison.question,
        type: 'multiple_choice',
        answer: comparison.answer,
        options: comparison.options,
        module: 'M02_Y4_MEAS',
        level: level
    };
}

function generateEstimateFromContext(params, level) {
    const contexts = [
        {
            question: 'A pencil is 15 cm long. Estimate the length of a ruler.',
            answer: '30 cm',
            options: ['15 cm', '30 cm', '60 cm', '120 cm']
        },
        {
            question: 'A bottle holds 500 ml of water. Estimate how much water fills a bucket.',
            answer: '10 litres',
            options: ['1 litre', '5 litres', '10 litres', '50 litres']
        },
        {
            question: 'An apple has a mass of about 150 g. Estimate the mass of a bag of 6 apples.',
            answer: '900 g',
            options: ['300 g', '600 g', '900 g', '1500 g']
        },
        {
            question: 'A lesson is 1 hour long. Estimate how long the whole school day is.',
            answer: '6 hours',
            options: ['2 hours', '4 hours', '6 hours', '12 hours']
        },
        {
            question: 'A chocolate bar costs 80p. Estimate the cost of 5 chocolate bars.',
            answer: '£4',
            options: ['£2', '£4', '£8', '£10']
        },
        {
            question: 'A can of drink costs 90p. Estimate the cost of 4 cans.',
            answer: '£3.60',
            options: ['£1.80', '£3.60', '£7.20', '£9']
        },
        {
            question: 'A table is 75 cm tall. Estimate the height of a door.',
            answer: '2 m',
            options: ['1 m', '2 m', '5 m', '10 m']
        },
        {
            question: 'A mug holds 300 ml of tea. Estimate how much a teapot holds.',
            answer: '1 litre',
            options: ['500 ml', '1 litre', '5 litres', '10 litres']
        },
        {
            question: 'A loaf of bread costs £1.20. Estimate the cost of 3 loaves.',
            answer: '£3.60',
            options: ['£1.20', '£2.40', '£3.60', '£7.20']
        },
        {
            question: 'A step is about 20 cm high. Estimate the height of a staircase with 10 steps.',
            answer: '2 m',
            options: ['50 cm', '1 m', '2 m', '5 m']
        }
    ];

    const context = contexts[Math.floor(Math.random() * contexts.length)];

    return {
        text: context.question,
        type: 'multiple_choice',
        answer: context.answer,
        options: context.options,
        module: 'M02_Y4_MEAS',
        level: level
    };
}

export default {
    moduleId: 'M02_Y4_MEAS',
    generate: generateQuestion
};
