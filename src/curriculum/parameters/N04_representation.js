/**
 * N04 Module Series: Identify, Represent, Estimate and Round
 * Covers Years 1-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N04_Y1_NPV: {
        1: {
            operations: ["number_line_position", "count_objects", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 10 } },
            presentation: { numberLine: { max: 10 }, objects: { types: ["dots", "stars", "circles"] }, comparison: { words: ["equal to", "more than", "less than", "most", "least"] } }
        },
        2: {
            operations: ["number_line_position", "count_objects", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 20 } },
            presentation: { numberLine: { max: 20 }, objects: { types: ["dots", "stars", "circles", "blocks"] }, comparison: { words: ["equal to", "more than", "less than", "fewer", "most", "least"] } }
        },
        3: {
            operations: ["number_line_position", "number_line_between", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 50 } },
            presentation: { numberLine: { max: 50 }, objects: { types: ["dots", "stars", "circles", "blocks", "tallies"] }, comparison: { words: ["equal to", "more than", "less than", "fewer", "most", "least"] } }
        },
        4: {
            operations: ["number_line_position", "number_line_between", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 100 } },
            presentation: { numberLine: { max: 100 }, objects: { types: ["dots", "stars", "circles", "blocks", "tallies"] }, comparison: { words: ["equal to", "more than", "less than", "fewer", "most", "least"] } }
        }
    },
    N04_Y2_NPV: {
        1: {
            operations: ["number_line_position", "number_line_between", "estimate_group", "place_value_representation"],
            math: { range: { min: 0, max: 50 }, estimation: { ranges: [[0, 10], [10, 30], [30, 50]] }, placeValue: { max: 50 } },
            presentation: { numberLine: { max: 50 } }
        },
        2: {
            operations: ["number_line_position", "number_line_between", "number_line_jump", "estimate_group", "place_value_representation", "estimate_position"],
            math: { range: { min: 0, max: 100 }, estimation: { ranges: [[0, 25], [25, 50], [50, 75], [75, 100]] }, placeValue: { max: 100 } },
            presentation: { numberLine: { max: 100 } }
        },
        3: {
            operations: ["number_line_position", "number_line_between", "number_line_jump", "estimate_position", "place_value_representation", "partition_number"],
            math: { range: { min: 0, max: 100 }, estimation: { ranges: [[0, 25], [25, 50], [50, 75], [75, 100]] }, placeValue: { max: 100 } },
            presentation: { numberLine: { max: 100 } }
        },
        4: {
            operations: ["number_line_multiple_positions", "number_line_jump", "estimate_position", "place_value_representation", "partition_number", "estimate_calculation"],
            math: { range: { min: 0, max: 100 }, estimation: { ranges: [[0, 30], [30, 60], [60, 100]] }, placeValue: { max: 100 } },
            presentation: { numberLine: { max: 100 } }
        }
    },
    N04_Y3_NPV: {
        1: {
            operations: ["number_line_position", "number_line_between", "estimate_position", "place_value_representation", "partition_number"],
            math: { range: { min: 0, max: 200 }, estimation: { ranges: [[0, 50], [50, 100], [100, 150], [150, 200]] }, placeValue: { max: 200 } },
            presentation: { numberLine: { max: 200 } }
        },
        2: {
            operations: ["number_line_position", "number_line_jump", "estimate_position", "place_value_representation", "partition_number", "estimate_calculation"],
            math: { range: { min: 0, max: 500 }, estimation: { ranges: [[0, 100], [100, 300], [300, 500]] }, placeValue: { max: 500 } },
            presentation: { numberLine: { max: 500 } }
        },
        3: {
            operations: ["number_line_position", "number_line_jump", "estimate_position", "place_value_representation", "partition_number", "estimate_calculation", "estimate_midpoint"],
            math: { range: { min: 0, max: 1000 }, estimation: { ranges: [[0, 250], [250, 500], [500, 750], [750, 1000]] }, placeValue: { max: 1000 } },
            presentation: { numberLine: { max: 1000 } }
        },
        4: {
            operations: ["number_line_multiple_positions", "number_line_jump", "estimate_position", "partition_number", "estimate_calculation", "estimate_midpoint", "compare_representations"],
            math: { range: { min: 0, max: 1000 }, estimation: { ranges: [[0, 200], [200, 500], [500, 800], [800, 1000]] }, placeValue: { max: 1000 } },
            presentation: { numberLine: { max: 1000 } }
        }
    },
    N04_Y4_NPV: {
        1: {
            operations: ["number_line_position", "estimate_position", "round_to_ten", "place_value_representation"],
            math: { range: { min: 10, max: 1000 }, rounding: { bases: [10] }, estimation: { ranges: [[0, 250], [250, 500], [500, 750], [750, 1000]] } },
            presentation: { numberLine: { max: 1000 } }
        },
        2: {
            operations: ["number_line_position", "estimate_position", "round_to_ten", "round_to_hundred", "partition_number", "estimate_calculation"],
            math: { range: { min: 10, max: 5000 }, rounding: { bases: [10, 100] }, estimation: { ranges: [[0, 1000], [1000, 3000], [3000, 5000]] } },
            presentation: { numberLine: { max: 5000 } }
        },
        3: {
            operations: ["number_line_position", "estimate_position", "round_to_hundred", "round_to_thousand", "estimate_calculation", "estimate_midpoint"],
            math: { range: { min: 100, max: 10000 }, rounding: { bases: [10, 100, 1000] }, estimation: { ranges: [[0, 2500], [2500, 5000], [5000, 7500], [7500, 10000]] } },
            presentation: { numberLine: { max: 10000 } }
        },
        4: {
            operations: ["number_line_jump", "estimate_position", "round_to_ten", "round_to_hundred", "round_to_thousand", "estimate_calculation", "compare_rounded"],
            math: { range: { min: 100, max: 10000 }, rounding: { bases: [10, 100, 1000] }, estimation: { ranges: [[0, 2000], [2000, 5000], [5000, 8000], [8000, 10000]] } },
            presentation: { numberLine: { max: 10000 } }
        }
    },
    N04_Y5_NPV: {
        1: {
            operations: ["round_to_ten", "round_to_hundred", "round_to_thousand", "round_to_ten_thousand", "estimate_position", "number_line_position"],
            math: { range: { min: 1000, max: 100000 }, rounding: { bases: [10, 100, 1000, 10000] }, estimation: { ranges: [[0, 25000], [25000, 50000], [50000, 75000], [75000, 100000]] } },
            presentation: { numberLine: { max: 100000 } }
        },
        2: {
            operations: ["round_to_hundred", "round_to_thousand", "round_to_ten_thousand", "round_to_hundred_thousand", "estimate_position", "estimate_calculation", "number_line_jump"],
            math: { range: { min: 10000, max: 500000 }, rounding: { bases: [100, 1000, 10000, 100000] }, estimation: { ranges: [[0, 100000], [100000, 300000], [300000, 500000]] } },
            presentation: { numberLine: { max: 500000 } }
        },
        3: {
            operations: ["round_to_ten", "round_to_hundred", "round_to_thousand", "round_to_ten_thousand", "round_to_hundred_thousand", "estimate_position", "estimate_calculation", "compare_rounded"],
            math: { range: { min: 10000, max: 1000000 }, rounding: { bases: [10, 100, 1000, 10000, 100000] }, estimation: { ranges: [[0, 250000], [250000, 500000], [500000, 750000], [750000, 1000000]] } },
            presentation: { numberLine: { max: 1000000 } }
        },
        4: {
            operations: ["round_to_ten_thousand", "round_to_hundred_thousand", "estimate_calculation", "compare_rounded", "choose_appropriate_rounding"],
            math: { range: { min: 100000, max: 1000000 }, rounding: { bases: [10000, 100000] }, estimation: { ranges: [[0, 200000], [200000, 500000], [500000, 800000], [800000, 1000000]] } },
            presentation: { numberLine: { max: 1000000 } }
        }
    },
    N04_Y6_NPV: {
        1: {
            operations: ["round_to_thousand", "round_to_ten_thousand", "round_to_hundred_thousand", "estimate_position"],
            math: { range: { min: 1000, max: 1000000 }, rounding: { bases: [1000, 10000, 100000] }, estimation: { ranges: [[0, 250000], [250000, 500000], [500000, 750000], [750000, 1000000]] } },
            presentation: { numberLine: { max: 1000000 } }
        },
        2: {
            operations: ["round_to_ten_thousand", "round_to_hundred_thousand", "round_to_million", "estimate_calculation", "compare_rounded"],
            math: { range: { min: 10000, max: 5000000 }, rounding: { bases: [10000, 100000, 1000000] }, estimation: { ranges: [[0, 1000000], [1000000, 3000000], [3000000, 5000000]] } },
            presentation: { numberLine: { max: 5000000 } }
        },
        3: {
            operations: ["round_to_hundred_thousand", "round_to_million", "round_to_ten_million", "estimate_calculation", "compare_rounded", "choose_appropriate_rounding"],
            math: { range: { min: 100000, max: 10000000 }, rounding: { bases: [100000, 1000000, 10000000] }, estimation: { ranges: [[0, 2500000], [2500000, 5000000], [5000000, 7500000], [7500000, 10000000]] } },
            presentation: { numberLine: { max: 10000000 } }
        },
        4: {
            operations: ["round_to_any_place", "estimate_calculation", "compare_rounded", "choose_appropriate_rounding", "error_bounds"],
            math: { range: { min: 1000000, max: 10000000 }, rounding: { bases: [10, 100, 1000, 10000, 100000, 1000000, 10000000] }, estimation: { ranges: [[0, 2000000], [2000000, 5000000], [5000000, 8000000], [8000000, 10000000]] } },
            presentation: { numberLine: { max: 10000000 } }
        }
    }
};

export const N04_MODULES = {
    'N04_Y1_NPV': {
        id: 'N04_Y1_NPV',
        name: 'N04_Y1_NPV: Identify and Represent Numbers',
        description: 'Identify and represent numbers using objects and pictorial representations including the number line, and use the language of: equal to, more than, less than (fewer), most, least',
        icon: '📊',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y1_NPV']
    },
    'N04_Y2_NPV': {
        id: 'N04_Y2_NPV',
        name: 'N04_Y2_NPV: Identify, Represent and Estimate Numbers',
        description: 'Identify, represent and estimate numbers using different representations, including the number line',
        icon: '📊',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y2_NPV']
    },
    'N04_Y3_NPV': {
        id: 'N04_Y3_NPV',
        name: 'N04_Y3_NPV: Identify, Represent and Estimate',
        description: 'Identify, represent and estimate numbers using different representations',
        icon: '📊',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y3_NPV']
    },
    'N04_Y4_NPV': {
        id: 'N04_Y4_NPV',
        name: 'N04_Y4_NPV: Represent, Estimate and Round',
        description: 'Identify, represent and estimate numbers using different representations; round any number to the nearest 10, 100 or 1,000',
        icon: '📊',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y4_NPV']
    },
    'N04_Y5_NPV': {
        id: 'N04_Y5_NPV',
        name: 'N04_Y5_NPV: Round to 1,000,000',
        description: 'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000',
        icon: '📊',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y5_NPV']
    },
    'N04_Y6_NPV': {
        id: 'N04_Y6_NPV',
        name: 'N04_Y6_NPV: Round to Any Degree of Accuracy',
        description: 'Round any whole number to a required degree of accuracy',
        icon: '📊',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y6_NPV']
    }
};