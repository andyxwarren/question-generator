/**
 * M08_Y5_MEAS: Estimate Volume and Capacity
 *
 * Curriculum: "estimate volume [e.g. using 1 cm³ blocks to build cuboids (including cubes)]
 * and capacity [e.g. using water]"
 *
 * Operations:
 * - count_unit_cubes: Estimate number of unit cubes in a cuboid
 * - estimate_capacity: Estimate capacity of familiar objects
 * - convert_volume_capacity: Convert between cm³ and ml
 * - compare_volumes: Compare volumes of two cuboids
 */

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random element from an array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Format volume with appropriate units
 */
function formatVolume(volume, useLitres = false) {
    if (useLitres && volume >= 1000) {
        const litres = volume / 1000;
        if (litres === Math.floor(litres)) {
            return `${litres} litre${litres !== 1 ? 's' : ''}`;
        } else {
            return `${litres.toFixed(1)} litres`;
        }
    }
    return `${volume} ml`;
}

/**
 * Generate count unit cubes question
 * Students estimate total cubes in a cuboid
 */
function generateCountUnitCubes(params) {
    const length = randomInt(params.min_dimension, params.max_dimension);
    const width = randomInt(params.min_dimension, params.max_dimension);
    const height = randomInt(params.min_dimension, params.max_dimension);

    const totalCubes = length * width * height;

    // Vary the question wording
    const wordings = [
        `A cuboid is built from unit cubes. It is ${length} cubes long, ${width} cubes wide, and ${height} cubes tall. How many unit cubes were used?`,
        `A box measures ${length} cm by ${width} cm by ${height} cm. How many 1 cm³ cubes would fit inside it?`,
        `A rectangular prism is ${length} cm long, ${width} cm wide, and ${height} cm high. Estimate how many cubic centimetres (cm³) of space it contains.`
    ];

    const questionText = randomChoice(wordings);

    return {
        text: questionText,
        type: 'text_input',
        answer: String(totalCubes),
        hint: `Multiply length × width × height: ${length} × ${width} × ${height}`,
        module: 'M08_Y5_MEAS'
    };
}

/**
 * Generate estimate capacity question
 * Students estimate capacity of familiar objects
 */
function generateEstimateCapacity(params) {
    const obj = randomChoice(params.objects);
    const useLitres = params.use_litres && obj.capacity >= 1000;

    // Generate multiple choice options
    const correctAnswer = obj.capacity;

    // Create plausible distractors
    const options = [
        correctAnswer,
        Math.floor(correctAnswer * 0.5),  // Half
        Math.floor(correctAnswer * 2),    // Double
        Math.floor(correctAnswer * 1.5)   // 1.5x
    ].sort((a, b) => a - b);

    // Format options with appropriate units
    const formattedOptions = options.map(opt => formatVolume(opt, useLitres));
    const formattedAnswer = formatVolume(correctAnswer, useLitres);

    return {
        text: `Estimate the capacity of a typical ${obj.name}.`,
        type: 'multiple_choice',
        answer: formattedAnswer,
        options: formattedOptions,
        module: 'M08_Y5_MEAS'
    };
}

/**
 * Generate convert volume capacity question
 * Convert between cm³ and ml (1 cm³ = 1 ml)
 */
function generateConvertVolumeCapacity(params) {
    // Generate a reasonable volume in cm³
    const baseVolume = randomInt(params.min_dimension, params.max_dimension);
    const volume = baseVolume * baseVolume * randomInt(2, 4); // Creates values like 16, 24, 32, etc.

    const questionTypes = [
        {
            text: `A container holds ${volume} cm³. How many millilitres (ml) is this?`,
            answer: volume,
            hint: '1 cm³ = 1 ml, so the number stays the same'
        },
        {
            text: `A box has a volume of ${volume} cubic centimetres. What is this in millilitres?`,
            answer: volume,
            hint: 'Remember: 1 cm³ = 1 ml'
        }
    ];

    // For higher levels with litres
    if (params.use_litres && volume >= 100) {
        const largeVolume = volume * 10; // Make it a multiple that works well
        questionTypes.push({
            text: `A tank holds ${largeVolume} ml. How many cm³ is this?`,
            answer: largeVolume,
            hint: '1 ml = 1 cm³'
        });

        if (largeVolume >= 1000) {
            const litres = largeVolume / 1000;
            const cm3 = largeVolume;
            questionTypes.push({
                text: `A container holds ${litres} litre${litres !== 1 ? 's' : ''}. How many cm³ is this?`,
                answer: cm3,
                hint: '1 litre = 1000 ml, and 1 ml = 1 cm³'
            });
        }
    }

    const selected = randomChoice(questionTypes);

    return {
        text: selected.text,
        type: 'text_input',
        answer: String(selected.answer),
        hint: selected.hint,
        module: 'M08_Y5_MEAS'
    };
}

/**
 * Generate compare volumes question
 * Compare two cuboids and determine which has greater volume
 */
function generateCompareVolumes(params) {
    // Generate two different cuboids
    const length1 = randomInt(params.min_dimension, params.max_dimension);
    const width1 = randomInt(params.min_dimension, params.max_dimension);
    const height1 = randomInt(params.min_dimension, params.max_dimension);

    const volume1 = length1 * width1 * height1;

    // Generate second cuboid with different dimensions
    let length2, width2, height2, volume2;
    do {
        length2 = randomInt(params.min_dimension, params.max_dimension);
        width2 = randomInt(params.min_dimension, params.max_dimension);
        height2 = randomInt(params.min_dimension, params.max_dimension);
        volume2 = length2 * width2 * height2;
    } while (Math.abs(volume1 - volume2) < 10); // Ensure clear difference

    const difference = Math.abs(volume1 - volume2);

    // Determine which is larger
    const box1Larger = volume1 > volume2;
    const largerBox = box1Larger ? 'Box A' : 'Box B';

    const questionTypes = [
        {
            text: `Box A measures ${length1} cm × ${width1} cm × ${height1} cm. Box B measures ${length2} cm × ${width2} cm × ${height2} cm. Which box has the greater volume?`,
            type: 'multiple_choice',
            answer: largerBox,
            options: ['Box A', 'Box B', 'They are equal']
        },
        {
            text: `Box A is ${length1} cm by ${width1} cm by ${height1} cm. Box B is ${length2} cm by ${width2} cm by ${height2} cm. What is the difference in their volumes (in cm³)?`,
            type: 'text_input',
            answer: String(difference),
            hint: 'Calculate both volumes, then subtract the smaller from the larger'
        }
    ];

    const selected = randomChoice(questionTypes);

    return {
        text: selected.text,
        type: selected.type,
        answer: selected.answer,
        options: selected.options,
        hint: selected.hint,
        module: 'M08_Y5_MEAS'
    };
}

/**
 * Main generator function
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'count_unit_cubes':
            return generateCountUnitCubes(params);
        case 'estimate_capacity':
            return generateEstimateCapacity(params);
        case 'convert_volume_capacity':
            return generateConvertVolumeCapacity(params);
        case 'compare_volumes':
            return generateCompareVolumes(params);
        default:
            return generateCountUnitCubes(params);
    }
}

export default {
    moduleId: 'M08_Y5_MEAS',
    generate: generateQuestion
};
