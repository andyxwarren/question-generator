# Generator Refactoring Status Tracker

**Last Updated:** 2025-11-23

**Total Generators:** 101
**Refactored:** 3
**Operations Refactored:** 4 / ~250
**Not Yet Assessed:** 98

---

## Status Legend

- ✅ **REFACTORED** - Fully refactored with new schema
- 🔍 **ASSESSED** - Reviewed, contains operations needing refactor
- ❌ **NOT ASSESSED** - Not yet reviewed
- 🚫 **OLD SCHEMA** - Uses old text/answer pattern

---

## Refactored Generators (3 files, 4 operations)

| Module ID | File | Operations Refactored | Status | Notes |
|-----------|------|----------------------|--------|-------|
| C01_Y2_CALC | C01_Y2_CALC_mental.js | `recall_to_20` | ✅ REFACTORED | Complete with [unknown] pattern |
| C01_Y2_CALC | C01_Y2_CALC_mental.js | `missing_addend` | ✅ REFACTORED | Complete with [unknown] pattern |
| M03_Y2_MEAS | M03_Y2_MEAS_money.js | `combine_same_coins` | ✅ REFACTORED | Money metadata complete |
| M07_Y4_MEAS | M07_Y4_MEAS_perimeter_area.js | `count_squares` | ✅ REFACTORED | Measurement metadata complete |
| M07_Y4_MEAS | M07_Y4_MEAS_perimeter_area.js | `rectilinear_perimeter` | 🔍 PARTIAL | Only shows_all_sides=true path refactored |

---

## Operations Needing Refactor in Assessed Generators

### C01_Y2_CALC_mental.js (5 operations pending)

| Operation | Status | Notes |
|-----------|--------|-------|
| `derive_to_100` | 🚫 OLD SCHEMA | Uses old text/answer pattern |
| `related_subtract` | 🚫 OLD SCHEMA | Uses old text/answer pattern |
| `inverse_operations` | 🚫 OLD SCHEMA | Uses old text/answer pattern, has ___ placeholder |
| `fact_families_100` | 🚫 OLD SCHEMA | Uses old text/answer pattern |
| `near_multiples` | 🚫 OLD SCHEMA | Uses old text/answer pattern |

### M03_Y2_MEAS_money.js (remaining operations)

| Operation | Status | Notes |
|-----------|--------|-------|
| Other money operations | ❌ NOT ASSESSED | Need to review all operations in this file |

### M07_Y4_MEAS_perimeter_area.js (remaining operations)

| Operation | Status | Notes |
|-----------|--------|-------|
| `rectilinear_missing_sides` | 🚫 OLD SCHEMA | Uses old text/answer pattern |
| `complex_rectilinear` | 🚫 OLD SCHEMA | Uses old text/answer pattern |
| `rectilinear_perimeter` (show_all_sides=false) | 🚫 OLD SCHEMA | One path not refactored |

---

## Not Yet Assessed (98 generators)

### Number & Place Value Modules (35 generators)

#### N01 - Counting (6 generators)
- ❌ N01_Y1_NPV_counting.js
- ❌ N01_Y2_NPV_counting.js
- ❌ N01_Y3_NPV_counting.js
- ❌ N01_Y4_NPV_counting.js
- ❌ N01_Y5_NPV_counting.js
- ❌ N01_Y6_NPV_counting.js

#### N02 - Read/Write Numbers (6 generators)
- ❌ N02_Y1_NPV_read_write.js
- ❌ N02_Y2_NPV_read_write.js
- ❌ N02_Y3_NPV_read_write.js
- ❌ N02_Y4_NPV_read_write.js
- ❌ N02_Y5_NPV_read_write.js
- ❌ N02_Y6_NPV_read_write.js

#### N03 - Place Value (9 generators)
- ❌ N03_Y1_NPV_place_value.js
- ❌ N03_Y2_NPV_place_value.js
- ❌ N03_Y3_NPV_place_value.js
- ❌ N03_Y4_NPV_place_value.js
- ❌ N03_Y5_NPV_place_value.js
- ❌ N03_Y6_NPV_place_value.js
- ❌ N03_Y3_NPV_roman.js
- ❌ N03_Y4_NPV_roman.js
- ❌ N03_Y5_NPV_roman.js

#### N04 - Representation (6 generators)
- ❌ N04_Y1_NPV_representation.js
- ❌ N04_Y2_NPV_representation.js
- ❌ N04_Y3_NPV_representation.js
- ❌ N04_Y4_NPV_representation.js
- ❌ N04_Y5_NPV_representation.js
- ❌ N04_Y6_NPV_representation.js

#### N05 - Negatives (3 generators)
- ❌ N05_Y4_NPV_negatives.js
- ❌ N05_Y5_NPV_negatives.js
- ❌ N05_Y6_NPV_negatives.js

#### N06 - Number Problems (5 generators)
- ❌ N06_Y1_NPV_problems.js
- ❌ N06_Y2_NPV_problems.js
- ❌ N06_Y3_NPV_problems.js
- ❌ N06_Y4_NPV_problems.js
- ❌ N06_Y5_NPV_problems.js

---

### Calculation Modules (31 generators)

#### C01 - Mental Add/Sub (remaining)
- 🔍 C01_Y2_CALC_mental.js (partially complete - see above)
- ❌ C01_Y3_CALC_mental.js
- ❌ C01_Y4_CALC_mental.js
- ❌ C01_Y5_CALC_mental.js

#### C02 - Written Add/Sub (5 generators)
- ❌ C02_Y2_CALC_written.js
- ❌ C02_Y3_CALC_written.js
- ❌ C02_Y4_CALC_written.js
- ❌ C02_Y5_CALC_written.js
- ❌ C02_Y6_CALC_written.js

#### C03 - Estimation (5 generators)
- ❌ C03_Y3_CALC_estimation.js
- ❌ C03_Y4_CALC_estimation.js
- ❌ C03_Y5_CALC_estimation.js
- ❌ C03_Y6_CALC_estimation.js
- ❌ C03_Y6_CALC_rounding.js

#### C04 - Calculation Problems (3 generators)
- ❌ C04_Y2_CALC_problems.js
- ❌ C04_Y3_CALC_problems.js
- ❌ C04_Y4_CALC_problems.js

#### C05 - Properties (2 generators)
- ❌ C05_Y4_CALC_properties.js
- ❌ C05_Y5_CALC_properties.js

#### C06 - Mental Mult/Div (5 generators)
- ❌ C06_Y2_CALC_mult_div.js
- ❌ C06_Y3_CALC_mult_div.js
- ❌ C06_Y4_CALC_mult_div.js
- ❌ C06_Y5_CALC_mult_div.js
- ❌ C06_Y6_CALC_mult_div.js

#### C07 - Written Mult/Div (5 generators)
- ❌ C07_Y3_CALC_written_mult.js
- ❌ C07_Y4_CALC_written_mult.js
- ❌ C07_Y5_CALC_written_mult.js
- ❌ C07_Y6_CALC_written_mult.js
- ❌ C07_Y6_CALC_written_div.js

#### C08 - Properties Mult/Div (6 generators)
- ❌ C08_Y2_CALC_mult_div.js
- ❌ C08_Y3_CALC_mult_div.js
- ❌ C08_Y4_CALC_mult_div.js
- ❌ C08_Y5_CALC_factors.js
- ❌ C08_Y5_CALC_multiples.js
- ❌ C08_Y6_CALC_common.js

#### C09 - Order of Operations (1 generator)
- ❌ C09_Y6_CALC_order.js

---

### Fraction Modules (20 generators)

#### F01 - Recognize Fractions (5 generators)
- ❌ F01_Y1_FRAC_recognize.js
- ❌ F01_Y2_FRAC_recognize.js
- ❌ F01_Y3_FRAC_recognize.js
- ❌ F01_Y4_FRAC_recognize.js
- ❌ F01_Y5_FRAC_recognize.js

#### F02 - Equivalent Fractions (3 generators)
- ❌ F02_Y3_FRAC_equivalent.js
- ❌ F02_Y4_FRAC_equivalent.js
- ❌ F02_Y5_FRAC_equivalent.js

#### F03 - Compare Fractions (4 generators)
- ❌ F03_Y3_FRAC_compare.js
- ❌ F03_Y4_FRAC_compare.js
- ❌ F03_Y5_FRAC_compare.js
- ❌ F03_Y6_FRAC_compare.js

#### F04 - Add/Subtract Fractions (4 generators)
- ❌ F04_Y4_FRAC_add_sub.js
- ❌ F04_Y5_FRAC_add_sub.js
- ❌ F04_Y6_FRAC_add_sub.js
- ❌ F04_Y6_FRAC_operations.js

#### F05 - Multiply/Divide Fractions (2 generators)
- ❌ F05_Y5_FRAC_mult.js
- ❌ F05_Y6_FRAC_div.js

#### F06 - Fractions of Amounts (2 generators)
- ❌ F06_Y2_FRAC_amounts.js
- ❌ F06_Y3_FRAC_amounts.js

---

### Measurement Modules (35 generators)

#### M01 - Comparison (4 generators)
- ❌ M01_Y1_MEAS_compare.js
- ❌ M01_Y2_MEAS_compare.js
- ❌ M01_Y3_MEAS_compare.js
- ❌ M01_Y4_MEAS_compare.js

#### M02 - Measure (4 generators)
- ❌ M02_Y1_MEAS_measure.js
- ❌ M02_Y2_MEAS_measure.js
- ❌ M02_Y3_MEAS_measure.js
- ❌ M02_Y4_MEAS_measure.js

#### M03 - Money (remaining)
- 🔍 M03_Y2_MEAS_money.js (partially complete - see above)
- ❌ M03_Y3_MEAS_money.js
- ❌ M03_Y4_MEAS_money.js

#### M04 - Time (5 generators)
- ❌ M04_Y1_MEAS_time.js
- ❌ M04_Y2_MEAS_time.js
- ❌ M04_Y3_MEAS_time.js
- ❌ M04_Y4_MEAS_time.js
- ❌ M04_Y5_MEAS_time.js

#### M05 - Conversions (1 generator)
- ❌ M05_Y4_MEAS_convert.js

#### M06 - Mixed Convert (3 generators)
- ❌ M06_Y4_MEAS_convert.js
- ❌ M06_Y5_MEAS_convert.js
- ❌ M06_Y6_MEAS_convert.js

#### M07 - Perimeter/Area (remaining)
- 🔍 M07_Y4_MEAS_perimeter_area.js (partially complete - see above)
- ❌ M07_Y5_MEAS_perimeter_area.js
- ❌ M07_Y6_MEAS_area_volume.js

#### M08 - Volume (2 generators)
- ❌ M08_Y5_MEAS_volume.js
- ❌ M08_Y6_MEAS_volume.js

#### M09 - Measurement Problems (6 generators)
- ❌ M09_Y2_MEAS_problems.js
- ❌ M09_Y3_MEAS_problems.js
- ❌ M09_Y4_MEAS_problems.js
- ❌ M09_Y5_MEAS_problems.js
- ❌ M09_Y6_MEAS_problems.js
- ❌ M09_Y6_MEAS_imperial.js

---

### Geometry Modules (12 generators)

#### G01 - 2D Shapes (4 generators)
- ❌ G01_Y1_GEOM_2d.js
- ❌ G01_Y2_GEOM_2d.js
- ❌ G01_Y3_GEOM_2d.js
- ❌ G01_Y4_GEOM_2d.js

#### G02 - Symmetry & Position (4 generators)
- ❌ G02_Y2_GEOM_symmetry.js
- ❌ G02_Y3_GEOM_symmetry.js
- ❌ G02_Y4_GEOM_symmetry.js
- ❌ G02_Y4_GEOM_construction.js

#### G03 - 3D Shapes (2 generators)
- ❌ G03_Y3_GEOM_3d.js
- ❌ G03_Y5_GEOM_3d.js

#### G04 - Angles (2 generators)
- ❌ G04_Y4_GEOM_angles.js
- ❌ G04_Y5_GEOM_angles.js

---

### Statistics Modules (8 generators)

#### S01 - Interpret Data (4 generators)
- ❌ S01_Y2_STAT_pictograms.js
- ❌ S01_Y3_STAT_bar_charts.js
- ❌ S01_Y4_STAT_interpret.js
- ❌ S01_Y5_STAT_interpret.js

#### S02 - Present Data (2 generators)
- ❌ S02_Y4_STAT_present.js
- ❌ S02_Y5_STAT_present.js

#### S03 - Mean Average (2 generators)
- ❌ S03_Y6_STAT_mean.js
- ❌ S03_Y6_STAT_compare.js

---

### Position & Direction (1 generator)

#### P01 - Coordinates (1 generator)
- ❌ P01_Y4_POS_coordinates.js

---

### Ratio & Proportion (4 generators)

#### R01 - Equivalent Ratios (1 generator)
- ❌ R01_Y6_RATIO_equivalent.js

#### R02 - Ratio Problems (1 generator)
- ❌ R02_Y6_RATIO_problems.js

#### R03 - Percentages (1 generator)
- ❌ R03_Y6_RATIO_percent.js

#### R04 - Unequal Sharing (1 generator)
- ❌ R04_Y6_RATIO_sharing.js

---

### Algebra (1 generator)

#### A01 - Simple Expressions (1 generator)
- ❌ A01_Y6_ALG_expressions.js

---

## Progress Tracking

### By Module Type

| Type | Total | Refactored | Assessed | Not Assessed | % Complete |
|------|-------|-----------|----------|--------------|------------|
| Number & Place Value | 35 | 0 | 0 | 35 | 0% |
| Calculations | 31 | 1 | 1 | 29 | 3.2% |
| Fractions | 20 | 0 | 0 | 20 | 0% |
| Measurements | 35 | 2 | 2 | 31 | 5.7% |
| Geometry | 12 | 0 | 0 | 12 | 0% |
| Statistics | 8 | 0 | 0 | 8 | 0% |
| Position | 1 | 0 | 0 | 1 | 0% |
| Ratio | 4 | 0 | 0 | 4 | 0% |
| Algebra | 1 | 0 | 0 | 1 | 0% |
| **TOTAL** | **101** | **3** | **3** | **98** | **3.0%** |

---

## Next Priority Files

**Recommended order based on impact:**

1. **C01_Y2_CALC_mental.js** - Complete remaining 5 operations
2. **M07_Y4_MEAS_perimeter_area.js** - Complete remaining 2 operations
3. **M03_Y2_MEAS_money.js** - Assess and refactor remaining operations
4. **C01_Y3-Y5_CALC_mental.js** - Similar structure to Y2
5. **N01_Y1-Y6_NPV_counting.js** - Pure number, should be straightforward

---

**End of Status Tracker**
