/**
 * M07 Module Series: Perimeter and Area
 * Covers Years 3-6 progression for perimeter and area concepts
 */

export const M07_MODULES = {
    'M07_Y3_MEAS': {
        id: 'M07_Y3_MEAS',
        name: 'M07_Y3_MEAS: Perimeter of Simple Shapes',
        description: 'measure the perimeter of simple 2-D shapes',
        icon: '📐',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'perimeter, area',
        ref: 'M7',
        parameters: {
            1: {
                operations: ['rectangle_perimeter', 'square_perimeter'],
                min_side: 2,
                max_side: 10,
                units: ['cm'],
                use_mixed_units: false
            },
            2: {
                operations: ['rectangle_perimeter', 'square_perimeter', 'triangle_perimeter'],
                min_side: 5,
                max_side: 20,
                units: ['cm', 'm'],
                use_mixed_units: false
            },
            3: {
                operations: ['rectangle_perimeter', 'square_perimeter', 'triangle_perimeter', 'pentagon_perimeter'],
                min_side: 10,
                max_side: 50,
                units: ['cm', 'm'],
                use_mixed_units: false
            },
            4: {
                operations: ['rectangle_perimeter', 'square_perimeter', 'triangle_perimeter', 'pentagon_perimeter', 'hexagon_perimeter'],
                min_side: 15,
                max_side: 100,
                units: ['cm', 'm'],
                use_mixed_units: true
            }
        }
    },

    'M07_Y4_MEAS': {
        id: 'M07_Y4_MEAS',
        name: 'M07_Y4_MEAS: Perimeter and Area',
        description: 'measure and calculate the perimeter of a rectilinear figure (including squares) in centimetres and metres; find the area of rectilinear shapes by counting squares',
        icon: '📐',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'perimeter, area',
        ref: 'M7',
        parameters: {
            1: {
                operations: ['rectilinear_perimeter', 'count_squares'],
                min_side: 2,
                max_side: 8,
                max_dimensions: [4, 4],  // Grid size for counting squares
                units: ['cm'],
                show_all_sides: true  // All sides labeled
            },
            2: {
                operations: ['rectilinear_perimeter', 'count_squares', 'rectilinear_missing_sides'],
                min_side: 3,
                max_side: 15,
                max_dimensions: [5, 5],
                units: ['cm', 'm'],
                show_all_sides: true
            },
            3: {
                operations: ['rectilinear_perimeter', 'count_squares', 'rectilinear_missing_sides'],
                min_side: 5,
                max_side: 30,
                max_dimensions: [6, 6],
                units: ['cm', 'm'],
                show_all_sides: false  // Some sides need calculating
            },
            4: {
                operations: ['rectilinear_perimeter', 'count_squares', 'rectilinear_missing_sides', 'complex_rectilinear'],
                min_side: 10,
                max_side: 50,
                max_dimensions: [8, 8],
                units: ['cm', 'm'],
                show_all_sides: false
            }
        }
    },

    'M07_Y5_MEAS': {
        id: 'M07_Y5_MEAS',
        name: 'M07_Y5_MEAS: Composite Shapes and Area Formulas',
        description: 'measure and calculate the perimeter of composite rectilinear shapes in centimetres and metres; calculate and compare the area of rectangles (including squares), and including using standard units, square centimetres (cm²) and square metres (m²) and estimate the area of irregular shapes',
        icon: '📐',
        yearGroup: 'Year 5',
        strand: 'Measurement',
        substrand: 'perimeter, area',
        ref: 'M7',
        parameters: {
            1: {
                operations: ['rectangle_area', 'square_area', 'composite_perimeter'],
                min_dimension: 2,
                max_dimension: 10,
                units: ['cm'],
                use_square_units: true,
                composite_complexity: 'simple'  // L-shapes only
            },
            2: {
                operations: ['rectangle_area', 'square_area', 'composite_perimeter', 'compare_areas'],
                min_dimension: 5,
                max_dimension: 20,
                units: ['cm', 'm'],
                use_square_units: true,
                composite_complexity: 'moderate'  // L and T shapes
            },
            3: {
                operations: ['rectangle_area', 'square_area', 'composite_perimeter', 'compare_areas', 'composite_area'],
                min_dimension: 10,
                max_dimension: 50,
                units: ['cm', 'm'],
                use_square_units: true,
                composite_complexity: 'moderate'
            },
            4: {
                operations: ['rectangle_area', 'square_area', 'composite_perimeter', 'compare_areas', 'composite_area', 'estimate_irregular'],
                min_dimension: 15,
                max_dimension: 100,
                units: ['cm', 'm'],
                use_square_units: true,
                composite_complexity: 'complex'  // Multiple rectilinear pieces
            }
        }
    },

    'M07_Y6_MEAS': {
        id: 'M07_Y6_MEAS',
        name: 'M07_Y6_MEAS: Area Formulas and Relationships',
        description: 'recognise that shapes with the same areas can have different perimeters and vice versa; calculate the area of parallelograms and triangles; recognise when it is possible to use the formulae for the area of shapes',
        icon: '📐',
        yearGroup: 'Year 6',
        strand: 'Measurement',
        substrand: 'perimeter, area',
        ref: 'M7',
        parameters: {
            1: {
                operations: ['same_area_diff_perimeter', 'parallelogram_area', 'triangle_area'],
                min_dimension: 3,
                max_dimension: 12,
                units: ['cm'],
                include_formula_recognition: false
            },
            2: {
                operations: ['same_area_diff_perimeter', 'same_perimeter_diff_area', 'parallelogram_area', 'triangle_area'],
                min_dimension: 5,
                max_dimension: 20,
                units: ['cm', 'm'],
                include_formula_recognition: true
            },
            3: {
                operations: ['same_area_diff_perimeter', 'same_perimeter_diff_area', 'parallelogram_area', 'triangle_area', 'formula_recognition'],
                min_dimension: 10,
                max_dimension: 50,
                units: ['cm', 'm'],
                include_formula_recognition: true
            },
            4: {
                operations: ['same_area_diff_perimeter', 'same_perimeter_diff_area', 'parallelogram_area', 'triangle_area', 'formula_recognition', 'composite_with_triangles'],
                min_dimension: 15,
                max_dimension: 100,
                units: ['cm', 'm', 'mm'],
                include_formula_recognition: true
            }
        }
    }
};
