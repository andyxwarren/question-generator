/**
 * M07: Perimeter & Area
 * Years 3-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M07_Y3_MEAS: {
        1: { operations: ["rectangle_perimeter", "square_perimeter"], math: { side: { min: 2, max: 10 }, units: ["cm"], mixedUnits: false } },
        2: { operations: ["rectangle_perimeter", "square_perimeter", "rectilinear_simple"], math: { side: { min: 2, max: 15 }, units: ["cm", "m"], mixedUnits: false }, presentation: { showAllSides: true } },
        3: { operations: ["rectangle_perimeter", "square_perimeter", "rectilinear_perimeter"], math: { side: { min: 2, max: 20 }, units: ["cm", "m"], mixedUnits: false }, presentation: { showAllSides: true } },
        4: { operations: ["rectangle_perimeter", "square_perimeter", "rectilinear_perimeter", "missing_side"], math: { side: { min: 2, max: 30 }, units: ["cm", "m", "mm"], mixedUnits: false }, presentation: { showAllSides: false } }
    },
    M07_Y4_MEAS: {
        1: { operations: ["rectilinear_perimeter", "count_squares"], math: { side: { min: 2, max: 8 }, grid: [4, 4], units: ["cm"] }, presentation: { showAllSides: true } },
        2: { operations: ["rectilinear_perimeter", "count_squares", "estimate_area"], math: { side: { min: 2, max: 10 }, grid: [6, 6], units: ["cm", "m"] }, presentation: { showAllSides: true } },
        3: { operations: ["rectilinear_perimeter", "count_squares", "area_comparison"], math: { side: { min: 2, max: 12 }, grid: [8, 8], units: ["cm", "m"] }, presentation: { showAllSides: false } },
        4: { operations: ["rectilinear_perimeter", "count_squares", "area_comparison", "irregular_shapes"], math: { side: { min: 2, max: 15 }, grid: [10, 10], units: ["cm", "m", "mm"] }, presentation: { showAllSides: false } }
    },
    M07_Y5_MEAS: {
        1: { operations: ["rectangle_area", "square_area", "composite_perimeter"], math: { dim: { min: 2, max: 10 }, units: ["cm"], squareUnits: true, complexity: "simple" } },
        2: { operations: ["rectangle_area", "square_area", "composite_perimeter", "composite_area"], math: { dim: { min: 2, max: 15 }, units: ["cm", "m"], squareUnits: true, complexity: "simple" } },
        3: { operations: ["rectangle_area", "square_area", "composite_perimeter", "composite_area"], math: { dim: { min: 2, max: 20 }, units: ["cm", "m"], squareUnits: true, complexity: "moderate" } },
        4: { operations: ["rectangle_area", "square_area", "composite_perimeter", "composite_area", "missing_dimension"], math: { dim: { min: 2, max: 30 }, units: ["cm", "m", "mm"], squareUnits: true, complexity: "complex" } }
    },
    M07_Y6_MEAS: {
        1: { operations: ["parallelogram_area", "triangle_area"], math: { dim: { min: 3, max: 12 }, units: ["cm"], formulaRecog: false } },
        2: { operations: ["parallelogram_area", "triangle_area", "circle_area"], math: { dim: { min: 3, max: 15 }, units: ["cm", "m"], formulaRecog: false, radius: { min: 2, max: 10 } } },
        3: { operations: ["parallelogram_area", "triangle_area", "circle_area"], math: { dim: { min: 3, max: 20 }, units: ["cm", "m"], formulaRecog: true, radius: { min: 2, max: 15 } } },
        4: { operations: ["parallelogram_area", "triangle_area", "circle_area", "composite_shapes"], math: { dim: { min: 3, max: 30 }, units: ["cm", "m", "mm"], formulaRecog: true, radius: { min: 2, max: 20 } } }
    }
};

export const M07_MODULES = {
    'M07_Y3_MEAS': { id: 'M07_Y3_MEAS', name: 'M07_Y3: Simple Perimeter', ref: 'M7', yearGroup: '3', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y3_MEAS'] },
    'M07_Y4_MEAS': { id: 'M07_Y4_MEAS', name: 'M07_Y4: Perimeter/Area', ref: 'M7', yearGroup: '4', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y4_MEAS'] },
    'M07_Y5_MEAS': { id: 'M07_Y5_MEAS', name: 'M07_Y5: Composite', ref: 'M7', yearGroup: '5', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y5_MEAS'] },
    'M07_Y6_MEAS': { id: 'M07_Y6_MEAS', name: 'M07_Y6: Formulas', ref: 'M7', yearGroup: '6', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y6_MEAS'] }
};
