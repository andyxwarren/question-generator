# Generator Coverage vs National Curriculum Modules

This report compares the modules defined in `references/national_curriculum_framework_excel.json` with the generators implemented in `src/generators`.

Naming convention assumed:
`<Uid>_<short-description>.js` → e.g. `C01_Y1_CALC_mental.js` corresponds to `Uid: "C01_Y1_CALC"`.

---

## Key

- **Has generator**: A matching file exists in `src/generators` using the Uid as prefix.
- **Missing generator**: No corresponding generator file found for that Uid.

---

## CALC Strand (Addition, subtraction, multiplication and division)

### C01 – Add / subtract mentally (C1)

Uids in curriculum: `C01_Y1_CALC` … `C01_Y6_CALC`

| Uid          | Status            | Generator file                       |
|-------------|-------------------|--------------------------------------|
| C01_Y1_CALC | Has generator     | `C01_Y1_CALC_mental.js`             |
| C01_Y2_CALC | Has generator     | `C01_Y2_CALC_mental.js`             |
| C01_Y3_CALC | Has generator     | `C01_Y3_CALC_mental.js`             |
| C01_Y4_CALC | Missing generator | –                                    |
| C01_Y5_CALC | Has generator     | `C01_Y5_CALC_mental.js`             |
| C01_Y6_CALC | Missing generator | –                                    |

---

### C02 – Add / subtract using written methods (C2)

Uids in curriculum: `C02_Y1_CALC` … `C02_Y6_CALC`

| Uid          | Status            | Generator file                        |
|-------------|-------------------|---------------------------------------|
| C02_Y1_CALC | Has generator     | `C02_Y1_CALC_written.js`             |
| C02_Y2_CALC | Has generator     | `C02_Y2_CALC_written.js`             |
| C02_Y3_CALC | Has generator     | `C02_Y3_CALC_written.js`             |
| C02_Y4_CALC | Has generator     | `C02_Y4_CALC_written.js`             |
| C02_Y5_CALC | Has generator     | `C02_Y5_CALC_written.js`             |
| C02_Y6_CALC | Missing generator | –                                     |

---

### C03 – Estimate, use inverses and check (C3)

Uids in curriculum: `C03_Y1_CALC` … `C03_Y6_CALC`

| Uid          | Status            | Generator file                           |
|-------------|-------------------|------------------------------------------|
| C03_Y1_CALC | Missing generator | –                                        |
| C03_Y2_CALC | Has generator     | `C03_Y2_CALC_estimation.js`             |
| C03_Y3_CALC | Has generator     | `C03_Y3_CALC_estimation.js`             |
| C03_Y4_CALC | Has generator     | `C03_Y4_CALC_estimation.js`             |
| C03_Y5_CALC | Has generator     | `C03_Y5_CALC_estimation.js`             |
| C03_Y6_CALC | Has generator     | `C03_Y6_CALC_estimation.js`             |

---

### C04 – Add / subtract to solve problems (C4)

Uids in curriculum: `C04_Y1_CALC` … `C04_Y6_CALC`

| Uid          | Status        | Generator file                    |
|-------------|---------------|-----------------------------------|
| C04_Y1_CALC | Has generator | `C04_Y1_CALC_problems.js`        |
| C04_Y2_CALC | Has generator | `C04_Y2_CALC_problems.js`        |
| C04_Y3_CALC | Has generator | `C04_Y3_CALC_problems.js`        |
| C04_Y4_CALC | Has generator | `C04_Y4_CALC_problems.js`        |
| C04_Y5_CALC | Has generator | `C04_Y5_CALC_problems.js`        |
| C04_Y6_CALC | Has generator | `C04_Y6_CALC_problems.js`        |

---

### C05 – Properties of number (multiples, factors, primes, squares and cubes) (C5)

Uids in curriculum: `C05_Y1_CALC` … `C05_Y6_CALC`

| Uid          | Status            | Generator file                       |
|-------------|-------------------|--------------------------------------|
| C05_Y1_CALC | Missing generator | –                                    |
| C05_Y2_CALC | Missing generator | –                                    |
| C05_Y3_CALC | Missing generator | –                                    |
| C05_Y4_CALC | Missing generator | –                                    |
| C05_Y5_CALC | Has generator     | `C05_Y5_CALC_properties.js`          |
| C05_Y6_CALC | Has generator     | `C05_Y6_CALC_properties.js`          |

---

### C06 – Multiply / divide mentally (C6)

Uids in curriculum: `C06_Y1_CALC` … `C06_Y6_CALC`

| Uid          | Status            | Generator file                             |
|-------------|-------------------|--------------------------------------------|
| C06_Y1_CALC | Missing generator | –                                          |
| C06_Y2_CALC | Has generator     | `C06_Y2_CALC_mental_multiply.js`          |
| C06_Y3_CALC | Has generator     | `C06_Y3_CALC_mental_multiply.js`          |
| C06_Y4_CALC | Has generator     | `C06_Y4_CALC_mental_multiply.js`          |
| C06_Y5_CALC | Has generator     | `C06_Y5_CALC_mental_multiply.js`          |
| C06_Y6_CALC | Has generator     | `C06_Y6_CALC_mental_multiply.js`          |

---

### C07 – Multiply / divide using written methods (C7)

Uids in curriculum: `C07_Y1_CALC` … `C07_Y6_CALC`

| Uid          | Status            | Generator file                      |
|-------------|-------------------|-------------------------------------|
| C07_Y1_CALC | Missing generator | –                                   |
| C07_Y2_CALC | Has generator     | `C07_Y2_CALC_written.js`           |
| C07_Y3_CALC | Has generator     | `C07_Y3_CALC_written.js`           |
| C07_Y4_CALC | Has generator     | `C07_Y4_CALC_written.js`           |
| C07_Y5_CALC | Has generator     | `C07_Y5_CALC_written.js`           |
| C07_Y6_CALC | Has generator     | `C07_Y6_CALC_written.js`           |

---

### C08 – Solve problems (commutative, associative, distributive and all four operations) (C8)

Uids in curriculum: `C08_Y1_CALC` … `C08_Y6_CALC`

| Uid          | Status        | Generator file                         |
|-------------|---------------|----------------------------------------|
| C08_Y1_CALC | Has generator | `C08_Y1_CALC_properties.js`           |
| C08_Y2_CALC | Has generator | `C08_Y2_CALC_properties.js`           |
| C08_Y3_CALC | Has generator | `C08_Y3_CALC_properties.js`           |
| C08_Y4_CALC | Has generator | `C08_Y4_CALC_properties.js`           |
| C08_Y5_CALC | Has generator | `C08_Y5_CALC_properties.js`           |
| C08_Y6_CALC | Has generator | `C08_Y6_CALC_properties.js`           |

---

### C09 – Order of operations (C9)

Uids in curriculum: `C09_Y1_CALC` … `C09_Y6_CALC`

| Uid          | Status            | Generator file                |
|-------------|-------------------|-------------------------------|
| C09_Y1_CALC | Missing generator | –                             |
| C09_Y2_CALC | Missing generator | –                             |
| C09_Y3_CALC | Missing generator | –                             |
| C09_Y4_CALC | Missing generator | –                             |
| C09_Y5_CALC | Missing generator | –                             |
| C09_Y6_CALC | Has generator     | `C09_Y6_CALC_order.js`        |

---

## MEAS Strand (Measurement)

### M01 – Compare, describe and order measures (M1)

Uids in curriculum: `M01_Y1_MEAS` … `M01_Y6_MEAS`

| Uid           | Status            | Generator file                       |
|--------------|-------------------|--------------------------------------|
| M01_Y1_MEAS  | Has generator     | `M01_Y1_MEAS_comparison.js`         |
| M01_Y2_MEAS  | Has generator     | `M01_Y2_MEAS_comparison.js`         |
| M01_Y3_MEAS  | Has generator     | `M01_Y3_MEAS_comparison.js`         |
| M01_Y4_MEAS  | Has generator     | `M01_Y4_MEAS_comparison.js`         |
| M01_Y5_MEAS  | Missing generator | –                                    |
| M01_Y6_MEAS  | Missing generator | –                                    |

---

### M02 – Estimate, measure and read scales (M2)

Uids in curriculum: `M02_Y1_MEAS` … `M02_Y6_MEAS`

| Uid           | Status            | Generator file                     |
|--------------|-------------------|------------------------------------|
| M02_Y1_MEAS  | Has generator     | `M02_Y1_MEAS_measure.js`          |
| M02_Y2_MEAS  | Has generator     | `M02_Y2_MEAS_measure.js`          |
| M02_Y3_MEAS  | Has generator     | `M02_Y3_MEAS_measure.js`          |
| M02_Y4_MEAS  | Has generator     | `M02_Y4_MEAS_measure.js`          |
| M02_Y5_MEAS  | Missing generator | –                                  |
| M02_Y6_MEAS  | Missing generator | –                                  |

---

### M03 – Money (M3)

Uids in curriculum: `M03_Y1_MEAS` … `M03_Y6_MEAS`

| Uid           | Status            | Generator file                 |
|--------------|-------------------|--------------------------------|
| M03_Y1_MEAS  | Has generator     | `M03_Y1_MEAS_money.js`        |
| M03_Y2_MEAS  | Has generator     | `M03_Y2_MEAS_money.js`        |
| M03_Y3_MEAS  | Has generator     | `M03_Y3_MEAS_money.js`        |
| M03_Y4_MEAS  | Missing generator | –                              |
| M03_Y5_MEAS  | Missing generator | –                              |
| M03_Y6_MEAS  | Missing generator | –                              |

---

### M04 – Time: telling, ordering, duration and units (M4)

Uids in curriculum: `M04_Y1_MEAS` … `M04_Y6_MEAS`

| Uid           | Status            | Generator file                |
|--------------|-------------------|-------------------------------|
| M04_Y1_MEAS  | Has generator     | `M04_Y1_MEAS_time.js`        |
| M04_Y2_MEAS  | Has generator     | `M04_Y2_MEAS_time.js`        |
| M04_Y3_MEAS  | Has generator     | `M04_Y3_MEAS_time.js`        |
| M04_Y4_MEAS  | Has generator     | `M04_Y4_MEAS_time.js`        |
| M04_Y5_MEAS  | Has generator     | `M04_Y5_MEAS_time.js`        |
| M04_Y6_MEAS  | Missing generator | –                             |

---

### M05 – Conversions (strand-level summary)

Uids in curriculum: assumed `M05_Y1_MEAS` … `M05_Y6_MEAS`.

| Uid           | Status            | Generator file                     |
|--------------|-------------------|------------------------------------|
| M05_Y1_MEAS  | Missing generator | –                                  |
| M05_Y2_MEAS  | Missing generator | –                                  |
| M05_Y3_MEAS  | Missing generator | –                                  |
| M05_Y4_MEAS  | Missing generator | –                                  |
| M05_Y5_MEAS  | Has generator     | `M05_Y5_MEAS_conversions.js`      |
| M05_Y6_MEAS  | Missing generator | –                                  |

---

### M06 – Conversions (additional strand)

Uids in curriculum: assumed `M06_Y1_MEAS` … `M06_Y6_MEAS`.

| Uid           | Status            | Generator file                        |
|--------------|-------------------|---------------------------------------|
| M06_Y1_MEAS  | Missing generator | –                                     |
| M06_Y2_MEAS  | Missing generator | –                                     |
| M06_Y3_MEAS  | Missing generator | –                                     |
| M06_Y4_MEAS  | Has generator     | `M06_Y4_MEAS_conversions.js`         |
| M06_Y5_MEAS  | Has generator     | `M06_Y5_MEAS_conversions.js`         |
| M06_Y6_MEAS  | Has generator     | `M06_Y6_MEAS_conversions.js`         |

---

### M07 – Perimeter and area

Uids in curriculum: assumed `M07_Y1_MEAS` … `M07_Y6_MEAS`.

| Uid           | Status            | Generator file                           |
|--------------|-------------------|------------------------------------------|
| M07_Y1_MEAS  | Missing generator | –                                        |
| M07_Y2_MEAS  | Missing generator | –                                        |
| M07_Y3_MEAS  | Has generator     | `M07_Y3_MEAS_perimeter.js`              |
| M07_Y4_MEAS  | Has generator     | `M07_Y4_MEAS_perimeter_area.js`         |
| M07_Y5_MEAS  | Has generator     | `M07_Y5_MEAS_composite_area.js`         |
| M07_Y6_MEAS  | Has generator     | `M07_Y6_MEAS_area_formulas.js`          |

---

### M08 – Volume

Uids in curriculum: assumed `M08_Y1_MEAS` … `M08_Y6_MEAS`.

| Uid           | Status            | Generator file                    |
|--------------|-------------------|-----------------------------------|
| M08_Y1_MEAS  | Missing generator | –                                 |
| M08_Y2_MEAS  | Missing generator | –                                 |
| M08_Y3_MEAS  | Missing generator | –                                 |
| M08_Y4_MEAS  | Missing generator | –                                 |
| M08_Y5_MEAS  | Has generator     | `M08_Y5_MEAS_volume.js`          |
| M08_Y6_MEAS  | Has generator     | `M08_Y6_MEAS_volume.js`          |

---

### M09 – Measurement problems

Uids in curriculum: `M09_Y1_MEAS` … `M09_Y6_MEAS`.

| Uid           | Status            | Generator file                               |
|--------------|-------------------|----------------------------------------------|
| M09_Y1_MEAS  | Missing generator | –                                            |
| M09_Y2_MEAS  | Has generator     | `M09_Y2_MEAS_money_problems.js`             |
| M09_Y3_MEAS  | Has generator     | `M09_Y3_MEAS_measurement_problems.js`       |
| M09_Y4_MEAS  | Has generator     | `M09_Y4_MEAS_calculate_measures.js`         |
| M09_Y5_MEAS  | Has generator     | `M09_Y5_MEAS_decimal_measures.js`           |
| M09_Y6_MEAS  | Has generator     | `M09_Y6_MEAS_conversion_problems.js`        |

Additional non-Uid-mapped generator:

- `DEPRECATED_M09_MEAS_problems.js` – legacy/combined generator not tied to a specific year Uid.

---

## High-level Summary

- **CALC**:
  - Fully covered (all Uids have generators): C04, C08.
  - Partially covered: C01, C02, C03, C05, C06, C07, C09.
- **MEAS**:
  - Every M-strand (M01–M09) has at least one generator.
  - Every M-strand also has at least one year with a missing generator.
