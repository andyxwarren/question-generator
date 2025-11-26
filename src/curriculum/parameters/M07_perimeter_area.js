/**
 * M07: Perimeter & Area
 * Years 3-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M07_Y3_MEAS: {
        1: { operations: ["rectangle_perimeter", "square_perimeter"], math: { side: { min: 2, max: 10 }, units: ["cm"], mixedUnits: false } }
    },
    M07_Y4_MEAS: {
        1: { operations: ["rectilinear_perimeter", "count_squares"], math: { side: { min: 2, max: 8 }, grid: [4, 4], units: ["cm"] }, presentation: { showAllSides: true } }
    },
    M07_Y5_MEAS: {
        1: { operations: ["rectangle_area", "square_area", "composite_perimeter"], math: { dim: { min: 2, max: 10 }, units: ["cm"], squareUnits: true, complexity: "simple" } }
    },
    M07_Y6_MEAS: {
        1: { operations: ["parallelogram_area", "triangle_area"], math: { dim: { min: 3, max: 12 }, units: ["cm"], formulaRecog: false } }
    }
};

export const M07_MODULES = {
    'M07_Y3_MEAS': { id: 'M07_Y3_MEAS', name: 'M07_Y3: Simple Perimeter', ref: 'M7', yearGroup: '3', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y3_MEAS'] },
    'M07_Y4_MEAS': { id: 'M07_Y4_MEAS', name: 'M07_Y4: Perimeter/Area', ref: 'M7', yearGroup: '4', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y4_MEAS'] },
    'M07_Y5_MEAS': { id: 'M07_Y5_MEAS', name: 'M07_Y5: Composite', ref: 'M7', yearGroup: '5', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y5_MEAS'] },
    'M07_Y6_MEAS': { id: 'M07_Y6_MEAS', name: 'M07_Y6: Formulas', ref: 'M7', yearGroup: '6', strand: 'Measurement', substrand: 'Perimeter and area', parameters: MIGRATED_PARAMS['M07_Y6_MEAS'] }
};
