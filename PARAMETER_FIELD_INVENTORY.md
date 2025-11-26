# Comprehensive Parameter Field Inventory
## Analysis Date: 2025-11-25

This document catalogs ALL parameter fields currently in use across the 24 parameter modules, organized by module series and compared against the current schema.js.

---

## SECTION A: FIELDS BY MODULE SERIES

### N01 (Counting in Multiples) - Years 1-5
**Fields Used:**
- `operations`: N/A (not present in N01, but used in other N-series)
- `math.range.min`: number
- `math.range.max`: number
- `math.sequence.steps`: array<number>
- `math.sequence.length`: number
- `math.sequence.directions`: array<string>
- `math.sequence.startStrategy`: string
- `math.sequence.tensFromAny`: boolean (Y2 specific)
- `math.sequence.tensRange`: array<number> (Y2 specific)
- `presentation.gaps.position`: string
- `presentation.gaps.count`: number

**Notes:** N01 is fully V2-compliant. Uses nested structure correctly.

---

### N02 (Read, Write, Order, Compare) - Years 1-6
**Fields Used (FLAT STRUCTURE - NOT V2 COMPLIANT):**
- `min_value`: number
- `max_value`: number
- `word_min`: number
- `word_max`: number
- `operations`: array<string>
- `order_count_max`: number

**Notes:** N02 is NOT migrated to V2. Uses flat parameter structure from V1.

---

### N03 (Place Value & Roman Numerals) - Years 2-6
**Fields Used:**
- `operations`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.placeValue.places`: array<string>
- `math.placeValue.includeZero`: boolean
- `math.decomposition.format`: string
- `math.roman.min`: number (Y4-Y5)
- `math.roman.max`: number (Y4-Y5)
- `math.roman.operations`: array<string> (Y4-Y5)
- `math.roman.years`: array<number> (Y5 specific)

**Notes:** N03 is V2-compliant with good use of nested structure.

---

### N04 (Identify, Represent, Estimate, Round) - Years 1-6
**Fields Used:**
- `operations`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.estimation.ranges`: array<array<number>> (nested arrays)
- `math.placeValue.max`: number
- `math.rounding.bases`: array<number>
- `presentation.numberLine.max`: number
- `presentation.objects.types`: array<string>
- `presentation.comparison.words`: array<string>

**Notes:** N04 is V2-compliant. Extensive use of nested presentation fields.

---

### N05 (Negative Numbers) - Years 4-6
**Fields Used:**
- `math.range.min`: number (negative)
- `math.range.max`: number
- `math.range.temp`: array<number> (Y5-Y6 specific)
- `math.range.elevation`: array<number> (Y5-Y6 specific)
- `math.sequence.steps`: array<number>
- `math.sequence.length`: number
- `math.sequence.directions`: array<string>
- `math.sequence.startStrategy`: string
- `math.mustCrossZero`: boolean ⚠️ (NOT IN SCHEMA)
- `presentation.gaps.position`: string
- `presentation.gaps.count`: number
- `presentation.contexts`: array<string>
- `presentation.intervalTypes`: array<string> ⚠️ (NOT IN SCHEMA, Y6 specific)

**Notes:** N05 uses nested structure but introduces custom fields not in current schema.

---

### N06 (Number Problems) - Years 2-6
**Fields Used:**
- `operations`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.range.negative`: array<number> (Y5-Y6)
- `math.range.interval`: array<number> (Y6)
- `math.sequence.steps`: array<number>
- `math.steps.min`: number (Y4-Y6)
- `math.steps.max`: number
- `math.rounding.bases`: array<number>
- `math.roman.min`: number (Y4-Y5)
- `math.roman.max`: number (Y4-Y5)
- `math.complexity`: string ⚠️ (NOT IN SCHEMA)
- `presentation.contexts`: array<string>

**Notes:** N06 introduces `math.complexity` field not in schema. Uses nested structure well.

---

### C01 (Mental Addition/Subtraction) - Years 1, 2, 3, 5
**Fields Used:**
- `operations`: array<string>
- `math.range.max`: number
- `math.range.min`: number (Y5)
- `math.range.basicMax`: number (Y2 specific)
- `math.range.derivedMax`: number (Y2 specific)
- `math.range.min3`: number (Y3 specific)
- `math.range.max3`: number (Y3 specific)
- `math.targets`: array<number>
- `math.components.ones`: array<number> (Y3)
- `math.components.tens`: array<number> (Y3)
- `math.components.hundreds`: array<number> (Y3)
- `math.components.powers`: array<number> (Y5)
- `math.config.allowZero`: boolean
- `math.config.factFamilies`: boolean
- `math.config.multiplesOf10`: boolean (Y2)
- `math.config.cross10`: boolean (Y2)
- `math.config.avoidBridging`: boolean (Y3, Y5)
- `math.config.complexBridging`: boolean (Y3)
- `math.config.strategies`: boolean (Y5)
- `math.config.complex`: boolean (Y5)
- `presentation.styles`: array<string>

**Notes:** C01 is V2-compliant. Good use of `math.config` for flags.

---

### C02 (Written Addition/Subtraction) - Years 1-5
**Fields Used:**
- `operations`: array<string>
- `math.range.max`: number
- `math.range.min`: number
- `math.range.result`: array<number> (Y1)
- `math.range.max_2digit`: number (Y2)
- `math.range.min3`: number (Y3)
- `math.range.max3`: number (Y3)
- `math.range.resultMax`: number (Y3-Y5)
- `math.range.min4`: number (Y4)
- `math.range.max4`: number (Y4)
- `math.components.ones`: array<number> (Y2)
- `math.components.tens`: array<number> (Y2)
- `math.config.allowZero`: boolean
- `math.config.missingPositions`: array<string>
- `math.config.avoidBridging`: boolean (Y2)
- `math.config.avoidCarry`: boolean (Y2)
- `math.config.threeNumbersMax`: number (Y2)
- `math.config.complexity`: boolean (Y2)
- `math.config.noCarry`: boolean (Y3-Y5)
- `math.config.noBorrow`: boolean (Y3-Y5)
- `math.config.allowSingleCarry`: boolean (Y3-Y5)
- `math.config.allowMultiCarry`: boolean (Y3-Y5)
- `math.config.exceed1000`: boolean (Y3)
- `math.config.exceed10000`: boolean (Y4)
- `math.config.digits`: number or array<number> (Y5)
- `presentation.styles`: array<string>
- `presentation.hint`: string ⚠️ (NOT IN SCHEMA)

**Notes:** C02 introduces `presentation.hint` field not in current schema.

---

### C03 (Estimation & Checking) - Years 2-4
**Fields Used:**
- `operations`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.rounding.bases`: array<number>
- `math.calcTypes`: array<string> ⚠️ (NOT IN SCHEMA)
- `math.config.factFamilyComplete`: boolean
- `math.config.multiples10`: boolean
- `math.config.use3digit`: boolean
- `math.config.includeMult`: boolean
- `math.config.tables`: array<number>
- `presentation.formats`: array<string> ⚠️ (NOT IN SCHEMA)

**Notes:** C03 introduces `math.calcTypes` and `presentation.formats` not in schema.

---

### C04 (Calculation Problems) - Years 1-4
**Fields Used:**
- `operations`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.steps`: number ⚠️ (NOT IN SCHEMA)
- `math.config.allowZero`: boolean
- `presentation.contexts`: array<string>
- `presentation.format`: string

**Notes:** C04 introduces `math.steps` as a scalar (not nested). Inconsistent with other modules.

---

### C05 (Properties of Numbers) - Years 2-4
**Fields Used:**
- `operations`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.tables`: array<number>
- `math.factors.max`: number ⚠️ (NOT IN SCHEMA)
- `math.multiples.range`: array<number> ⚠️ (NOT IN SCHEMA)
- `presentation.styles`: array<string>

**Notes:** C05 introduces `math.factors` and `math.multiples` objects not in schema.

---

### C06 (Mental Multiply/Divide) - Years 2-6
**Fields Used:**
- `operations`: array<string>
- `math.tables`: array<number>
- `math.allTables`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.multiplier.min`: number ⚠️ (NOT IN SCHEMA)
- `math.multiplier.max`: number ⚠️ (NOT IN SCHEMA)
- `math.product.max`: number ⚠️ (NOT IN SCHEMA)
- `math.range.oddEven`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.range.factors`: array<number>
- `math.range.whole`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.range.num`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.powers`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.decimals.allow`: boolean ⚠️ (NOT IN SCHEMA)
- `math.decimals.places`: number ⚠️ (NOT IN SCHEMA)
- `math.config.maxOps`: number
- `math.config.parentheses`: boolean
- `math.config.squares`: boolean
- `presentation.styles`: array<string>

**Notes:** C06 has many custom fields: `multiplier`, `product`, `powers`, `decimals`, etc.

---

### C07 (Written Multiply/Divide) - Years 2-6
**Fields Used:**
- `operations`: array<string>
- `math.tables`: array<number>
- `math.multiplier.min`: number ⚠️
- `math.multiplier.max`: number ⚠️
- `math.product.max`: number ⚠️
- `math.range.multiplicand`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.range.multiplier`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.range.multiply`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.range.divide`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.digits`: array<number> or object ⚠️ (NOT IN SCHEMA)
- `math.factors.mult`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.config.carry`: boolean or string
- `math.config.remainders`: boolean
- `math.config.remainderType`: array<string>
- `presentation.styles`: array<string>

**Notes:** C07 has extensive custom fields for multiplication/division specifics.

---

### C08 (Properties of Multiplication/Division) - Years 1-6
**Fields Used:**
- `operations`: array<string>
- `math.tables`: array<number>
- `math.maxProduct`: number ⚠️ (NOT IN SCHEMA)
- `math.groups.min`: number ⚠️ (NOT IN SCHEMA)
- `math.groups.max`: number ⚠️ (NOT IN SCHEMA)
- `math.scaling`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.range.max`: number
- `math.range.factors`: array<number>
- `math.range.ops`: array<number> ⚠️ (NOT IN SCHEMA)
- `presentation.visuals`: boolean
- `presentation.format`: string

**Notes:** C08 introduces conceptual fields like `groups`, `scaling`, `maxProduct`.

---

### C09 (Order of Operations) - Year 6
**Fields Used:**
- `operations`: array<string>
- `math.range.num`: array<number> ⚠️
- `math.config.maxOps`: number
- `math.config.parentheses`: boolean
- `presentation.styles`: array<string>

**Notes:** C09 is simple but uses custom `range.num` field.

---

### M01 (Compare & Order Measurements) - Years 1-5
**Fields Used:**
- `operations`: array<string>
- `math.types`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.useUnits`: boolean ⚠️ (NOT IN SCHEMA)
- `math.allowEquals`: boolean ⚠️ (NOT IN SCHEMA)
- `math.sameUnitOnly`: boolean ⚠️ (NOT IN SCHEMA)
- `math.simpleConversions`: boolean ⚠️ (NOT IN SCHEMA)
- `math.units.length`: array<string>
- `math.units.mass`: array<string>
- `math.units.capacity`: array<string>
- `math.units.money`: array<string>
- `math.ranges.cm`: object {min, max} ⚠️ (NOT IN SCHEMA)
- `math.ranges.m`: object {min, max} ⚠️
- `math.ranges.g`: object {min, max} ⚠️
- `math.ranges.kg`: object {min, max} ⚠️
- `math.ranges.ml`: object {min, max} ⚠️
- `math.ranges.l`: object {min, max} ⚠️
- `math.ranges.mm`: object {min, max} ⚠️
- `math.ranges.p`: object {min, max} ⚠️
- `math.ranges.pounds`: object {min, max} ⚠️
- `math.ranges.km`: object {min, max} ⚠️
- `math.moneyFormat`: string ⚠️ (NOT IN SCHEMA)
- `presentation.useDescriptors`: boolean ⚠️ (NOT IN SCHEMA)

**Notes:** M01 has extensive custom structure with per-unit ranges nested under `math.ranges`.

---

### M02 (Reading Scales) - Years 1-4
**Fields Used:**
- `operations`: array<string>
- `math.types`: array<string>
- `math.scale.max`: number ⚠️ (NOT IN SCHEMA)
- `math.scale.interval`: number ⚠️ (NOT IN SCHEMA)
- `math.units.length`: array<string>
- `math.units.mass`: array<string>
- `math.units.capacity`: array<string>
- `math.ranges.cm`: object {min, max, interval} ⚠️
- `math.ranges.g`: object {min, max, interval} ⚠️
- `math.ranges.ml`: object {min, max, interval} ⚠️
- `math.ranges.mm`: object {min, max, interval} ⚠️
- `math.ranges.m`: object {min, max, interval} ⚠️
- `math.useDecimals`: boolean ⚠️ (NOT IN SCHEMA)
- `math.ranges.length.objects`: array<string> ⚠️
- `math.ranges.length.units`: array<string> ⚠️
- `presentation.showAllNumbers`: boolean ⚠️ (NOT IN SCHEMA)
- `presentation.pointerOnMark`: boolean ⚠️ (NOT IN SCHEMA)

**Notes:** M02 has highly specialized fields for scale reading: `scale.max`, `scale.interval`, `pointerOnMark`.

---

### M03 (Money) - Years 1-3
**Fields Used:**
- `operations`: array<string>
- `math.denominations`: array<number>
- `math.pounds`: boolean ⚠️ (NOT IN SCHEMA)
- `math.notes`: boolean ⚠️ (NOT IN SCHEMA)
- `math.max`: number
- `math.target.min`: number ⚠️ (NOT IN SCHEMA)
- `math.target.max`: number ⚠️ (NOT IN SCHEMA)
- `math.maxCoins`: number ⚠️ (NOT IN SCHEMA)
- `math.symbol`: string ⚠️ (NOT IN SCHEMA)
- `math.conversions`: boolean ⚠️ (NOT IN SCHEMA)
- `presentation`: object (minimal use)

**Notes:** M03 has money-specific fields: `denominations`, `pounds`, `notes`, `symbol`.

---

### M04 (Time) - Years 1-5
**Fields Used:**
- `operations`: array<string>
- `math.hours`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.hours24`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.minutes`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.halfPast`: boolean ⚠️ (NOT IN SCHEMA)
- `math.quarterTo`: boolean ⚠️ (NOT IN SCHEMA)
- `math.roman`: boolean ⚠️ (NOT IN SCHEMA)
- `math.facts`: array<string> ⚠️ (NOT IN SCHEMA)
- `math.ranges.hours`: object {min, max} ⚠️
- `math.ranges.hours24`: array<number> ⚠️
- `math.ranges.minutes`: array<number> ⚠️
- `math.conversions.hours`: object {min, max} ⚠️ (NOT IN SCHEMA)
- `math.conversions.minutes`: object {min, max} ⚠️
- `math.conversions.years`: object {min, max} ⚠️
- `math.include24`: boolean ⚠️ (NOT IN SCHEMA)
- `math.problemTypes`: array<string> ⚠️ (NOT IN SCHEMA)
- `presentation.types`: array<string> ⚠️ (NOT IN SCHEMA)
- `presentation.sequence`: array<string> ⚠️ (NOT IN SCHEMA)
- `presentation.multiStep`: boolean ⚠️ (NOT IN SCHEMA)

**Notes:** M04 has extensive time-specific fields: `hours`, `minutes`, `halfPast`, `quarterTo`, `include24`.

---

### M05 (Measurement Conversions) - Years 4-5
**Fields Used:**
- `operations`: array<string>
- `math.types`: array<string>
- `math.conversions.length`: array<string> ⚠️ (NOT IN SCHEMA)
- `math.conversions.mass`: array<string> ⚠️
- `math.conversions.capacity`: array<string> ⚠️
- `math.valueType`: array<string> ⚠️ (NOT IN SCHEMA)
- `math.ranges.km`: object {min, max} ⚠️
- `math.ranges.m`: object {min, max} ⚠️
- `math.decimalPlaces`: number ⚠️ (NOT IN SCHEMA)
- `presentation.wordProblems`: boolean ⚠️ (NOT IN SCHEMA)

**Notes:** M05 has conversion-specific nested structure under `math.conversions`.

---

### M06 (Mixed Unit Conversions) - Years 5-6
**Fields Used:**
- `operations`: array<string>
- `math.types`: array<string>
- `math.conversions.length`: array<string> ⚠️
- `math.conversions.mass`: array<string> ⚠️
- `math.conversions.capacity`: array<string> ⚠️
- `math.conversions.time`: array<string> ⚠️ (NOT IN SCHEMA)
- `math.ranges.km`: object {min, max} ⚠️
- `math.ranges.m`: object {min, max} ⚠️
- `math.ranges.kg`: object {min, max} ⚠️
- `math.ranges.hours`: object {min, max} ⚠️
- `math.ranges.inches`: object {min, max} ⚠️ (NOT IN SCHEMA - imperial)
- `math.ranges.miles`: object {min, max} ⚠️ (NOT IN SCHEMA - imperial)
- `math.valueType`: array<string> ⚠️
- `math.decimalPlaces`: number ⚠️
- `presentation.approximate`: boolean ⚠️ (NOT IN SCHEMA)
- `presentation.wordProblems`: boolean ⚠️

**Notes:** M06 extends M05 with imperial units and approximate conversions.

---

### M07 (Perimeter & Area) - Years 4-6
**Fields Used:**
- `operations`: array<string>
- `math.side.min`: number ⚠️ (NOT IN SCHEMA)
- `math.side.max`: number ⚠️ (NOT IN SCHEMA)
- `math.dim.min`: number ⚠️ (NOT IN SCHEMA)
- `math.dim.max`: number ⚠️ (NOT IN SCHEMA)
- `math.grid`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.units`: array<string>
- `math.mixedUnits`: boolean ⚠️ (NOT IN SCHEMA)
- `math.squareUnits`: boolean ⚠️ (NOT IN SCHEMA)
- `math.complexity`: string ⚠️
- `math.formulaRecog`: boolean ⚠️ (NOT IN SCHEMA)
- `presentation.showAllSides`: boolean ⚠️ (NOT IN SCHEMA)

**Notes:** M07 uses `side`, `dim`, `grid` for geometric constraints.

---

### M08 (Volume) - Years 5-6
**Fields Used:**
- `operations`: array<string>
- `math.dim.min`: number ⚠️
- `math.dim.max`: number ⚠️
- `math.objects`: array<object> ⚠️ (NOT IN SCHEMA)
- `math.units`: array<string>
- `math.useLitres`: boolean ⚠️ (NOT IN SCHEMA)
- `math.missingDim`: boolean ⚠️ (NOT IN SCHEMA)
- `presentation`: object (minimal use)

**Notes:** M08 uses `dim`, `objects`, `useLitres` for volume specifics.

---

### M09 (Measurement Problems) - Years 1-6
**Fields Used:**
- `operations`: array<string>
- `math.unit`: string ⚠️ (NOT IN SCHEMA)
- `math.types`: array<string>
- `math.range.min`: number
- `math.range.max`: number
- `math.totalMax`: number ⚠️ (NOT IN SCHEMA)
- `math.money.unit`: string ⚠️ (NOT IN SCHEMA)
- `math.money.range`: array<number> ⚠️
- `math.money.format`: string ⚠️
- `math.length.unit`: string ⚠️ (NOT IN SCHEMA)
- `math.length.range`: array<number> ⚠️
- `math.mult`: array<number> ⚠️ (NOT IN SCHEMA)
- `math.decimal`: number ⚠️ (NOT IN SCHEMA)
- `math.conversions.length`: array<string> ⚠️
- `math.conversions.mass`: array<string> ⚠️
- `presentation.contexts`: array<string>
- `presentation.change`: boolean ⚠️ (NOT IN SCHEMA)

**Notes:** M09 has nested measure-specific ranges: `money.range`, `length.range`.

---

## SECTION B: FIELDS NOT IN CURRENT SCHEMA

### NUMBER STRAND - Missing from schema:

#### N05 (Negatives):
- `math.mustCrossZero`: boolean - forces sequences to cross zero
- `math.range.temp`: array<number> - temperature context ranges
- `math.range.elevation`: array<number> - elevation context ranges
- `presentation.intervalTypes`: array<string> - types of interval questions

#### N06 (Problems):
- `math.complexity`: string - problem complexity level
- `math.range.negative`: array<number> - negative number ranges
- `math.range.interval`: array<number> - interval ranges
- `math.steps.min`: number - minimum steps in problem
- `math.steps.max`: number - maximum steps in problem

#### N04 (Representation):
- `math.estimation.ranges`: array<array<number>> - estimation range bands
- `presentation.numberLine.max`: number - max value on number line
- `presentation.objects.types`: array<string> - visual object types
- `presentation.comparison.words`: array<string> - comparative language

---

### CALCULATION STRAND - Missing from schema:

#### General Calculation Fields:
- `math.range.basicMax`: number - max for basic facts (C01)
- `math.range.derivedMax`: number - max for derived facts (C01)
- `math.range.min3`: number - 3-digit minimum (C01, C02)
- `math.range.max3`: number - 3-digit maximum (C01, C02)
- `math.range.min4`: number - 4-digit minimum (C02)
- `math.range.max4`: number - 4-digit maximum (C02)
- `math.range.result`: array<number> - result range (C02)
- `math.range.resultMax`: number - max result (C02)
- `math.range.max_2digit`: number - 2-digit max (C02)
- `presentation.hint`: string - hint text for questions (C02)

#### C03 (Estimation):
- `math.calcTypes`: array<string> - types of calculations to estimate
- `presentation.formats`: array<string> - question format types

#### C04 (Problems):
- `math.steps`: number - number of steps (scalar, not nested)

#### C05 (Properties):
- `math.factors.max`: number - maximum factor value
- `math.multiples.range`: array<number> - multiples range

#### C06/C07 (Multiply/Divide):
- `math.multiplier.min`: number - multiplier minimum
- `math.multiplier.max`: number - multiplier maximum
- `math.product.max`: number - maximum product
- `math.range.oddEven`: array<number> - range for odd/even
- `math.range.whole`: array<number> - whole number range
- `math.range.num`: array<number> - general number range
- `math.range.multiplicand`: array<number> - multiplicand range
- `math.range.multiplier`: array<number> - multiplier range (different from scalar)
- `math.range.multiply`: array<number> - multiplication problem range
- `math.range.divide`: array<number> - division problem range
- `math.range.factors`: array<number> - factor range
- `math.allTables`: array<number> - all tables to include
- `math.powers`: array<number> - powers of 10
- `math.decimals.allow`: boolean - allow decimals
- `math.decimals.places`: number - decimal places
- `math.digits`: array<number> or object - digit count constraints
- `math.factors.mult`: array<number> - multiplication factors

#### C08 (Properties of Operations):
- `math.maxProduct`: number - maximum product
- `math.groups.min`: number - minimum groups
- `math.groups.max`: number - maximum groups
- `math.scaling`: array<number> - scaling factors
- `math.range.ops`: array<number> - operations range
- `presentation.visuals`: boolean - include visual representations

#### C09 (Order of Operations):
- `math.range.num`: array<number> - number range for BODMAS

---

### MEASUREMENT STRAND - Missing from schema:

#### M01 (Compare/Order):
- `math.useUnits`: boolean - whether to use unit labels
- `math.allowEquals`: boolean - allow equality comparisons
- `math.sameUnitOnly`: boolean - restrict to same units
- `math.simpleConversions`: boolean - use simple conversions only
- `math.ranges.cm`: object {min, max} - per-unit ranges (ALL UNITS)
- `math.ranges.m`: object {min, max}
- `math.ranges.mm`: object {min, max}
- `math.ranges.km`: object {min, max}
- `math.ranges.g`: object {min, max}
- `math.ranges.kg`: object {min, max}
- `math.ranges.ml`: object {min, max}
- `math.ranges.l`: object {min, max}
- `math.ranges.p`: object {min, max}
- `math.ranges.pounds`: object {min, max}
- `math.moneyFormat`: string - money format style
- `presentation.useDescriptors`: boolean - use descriptive language

#### M02 (Scales):
- `math.scale.max`: number - scale maximum
- `math.scale.interval`: number - scale interval
- `math.ranges.[unit].interval`: number - interval for specific unit
- `math.useDecimals`: boolean - allow decimal readings
- `math.ranges.length.objects`: array<string> - object names for estimation
- `math.ranges.length.units`: array<string> - units for estimation
- `presentation.showAllNumbers`: boolean - show all scale numbers
- `presentation.pointerOnMark`: boolean - pointer on exact mark

#### M03 (Money):
- `math.denominations`: array<number> - coin/note denominations
- `math.pounds`: boolean - include pounds
- `math.notes`: boolean - include notes
- `math.target.min`: number - target amount minimum
- `math.target.max`: number - target amount maximum
- `math.maxCoins`: number - maximum coins allowed
- `math.symbol`: string - money symbol format
- `math.conversions`: boolean - include conversions

#### M04 (Time):
- `math.hours`: array<number> - specific hours
- `math.hours24`: array<number> - 24-hour format hours
- `math.minutes`: array<number> - specific minutes
- `math.halfPast`: boolean - include half past
- `math.quarterTo`: boolean - include quarter to
- `math.roman`: boolean - include roman numerals on clock
- `math.facts`: array<string> - time facts to include
- `math.ranges.hours`: object {min, max}
- `math.ranges.hours24`: array<number>
- `math.ranges.minutes`: array<number>
- `math.conversions.hours`: object {min, max}
- `math.conversions.minutes`: object {min, max}
- `math.conversions.years`: object {min, max}
- `math.include24`: boolean - include 24-hour format
- `math.problemTypes`: array<string> - types of time problems
- `presentation.types`: array<string> - presentation types
- `presentation.sequence`: array<string> - sequence types
- `presentation.multiStep`: boolean - multi-step problems

#### M05/M06 (Conversions):
- `math.conversions.length`: array<string> - length conversions
- `math.conversions.mass`: array<string> - mass conversions
- `math.conversions.capacity`: array<string> - capacity conversions
- `math.conversions.time`: array<string> - time conversions
- `math.valueType`: array<string> - value type constraints
- `math.decimalPlaces`: number - decimal place constraints
- `math.ranges.inches`: object {min, max} - imperial units
- `math.ranges.miles`: object {min, max}
- `presentation.approximate`: boolean - approximate conversions
- `presentation.wordProblems`: boolean - include word problems

#### M07 (Perimeter/Area):
- `math.side.min`: number - side length minimum
- `math.side.max`: number - side length maximum
- `math.dim.min`: number - dimension minimum
- `math.dim.max`: number - dimension maximum
- `math.grid`: array<number> - grid dimensions [rows, cols]
- `math.mixedUnits`: boolean - mix units in same problem
- `math.squareUnits`: boolean - include square units
- `math.formulaRecog`: boolean - formula recognition
- `presentation.showAllSides`: boolean - show all side lengths

#### M08 (Volume):
- `math.dim.min`: number - dimension minimum
- `math.dim.max`: number - dimension maximum
- `math.objects`: array<object> - object definitions with capacity
- `math.useLitres`: boolean - use litres
- `math.missingDim`: boolean - include missing dimension problems

#### M09 (Measurement Problems):
- `math.unit`: string - single unit specifier
- `math.totalMax`: number - maximum total
- `math.money.unit`: string - money unit
- `math.money.range`: array<number> - money range
- `math.money.format`: string - money format
- `math.length.unit`: string - length unit
- `math.length.range`: array<number> - length range
- `math.mult`: array<number> - multiplication factors
- `math.decimal`: number - decimal constraint
- `presentation.change`: boolean - include change problems

---

## SECTION C: INCONSISTENCIES FOUND

### 1. **Inconsistent `range` Field Usage**

**Problem:** The `math.range` field has many inconsistent sub-properties across modules.

**Examples:**
- N01: `math.range.min`, `math.range.max` (standard)
- C01 Y2: `math.range.basicMax`, `math.range.derivedMax` (custom)
- C01 Y3: `math.range.min3`, `math.range.max3` (digit-specific)
- C02 Y1: `math.range.result` (array)
- C02 Y2: `math.range.max_2digit` (underscore naming)
- C06: `math.range.oddEven`, `math.range.factors`, `math.range.whole`, `math.range.num` (all arrays)
- N05: `math.range.temp`, `math.range.elevation` (context-specific)
- N06: `math.range.negative`, `math.range.interval` (concept-specific)

**Recommendation:** Define clear sub-field conventions:
- `math.range.{min, max}` for standard ranges
- `math.range.result` for result constraints
- Context-specific ranges should use nested structure: `math.contexts.temperature.range`

---

### 2. **Inconsistent Component/Part Naming**

**Problem:** Similar concepts use different field names.

**Examples:**
- C01: `math.components.ones`, `math.components.tens`, `math.components.hundreds`
- C01 Y5: `math.components.powers`
- C02: `math.components.ones`, `math.components.tens`
- C06: `math.multiplier`, `math.product` (not in components)

**Recommendation:** Standardize on `math.components` for all constituent parts.

---

### 3. **Inconsistent Boolean Naming Conventions**

**Problem:** Boolean fields lack consistent naming patterns.

**Examples:**
- `math.config.allowZero` (camelCase, "allow" prefix)
- `math.useUnits` (camelCase, "use" prefix - NOT in config)
- `math.halfPast` (boolean state, no prefix)
- `math.pounds` (implicit boolean)
- `presentation.visuals` (implicit boolean)
- `presentation.wordProblems` (camelCase, no prefix)

**Recommendation:** Use consistent prefixes and placement:
- Capability flags: `math.config.allow*`, `math.config.include*`
- Feature toggles: `presentation.show*`, `presentation.include*`

---

### 4. **Inconsistent Nesting Levels**

**Problem:** Similar fields appear at different nesting levels.

**Examples:**
- `math.units`: array (M01) vs `math.units.length`, `math.units.mass` (M01, M02)
- `math.conversions`: boolean (M03) vs `math.conversions.length`, `math.conversions.mass` (M05)
- `math.steps`: number (C04) vs `math.steps.min`, `math.steps.max` (N06)
- `presentation.types`: array (M04) vs `math.types`: array (M01)

**Recommendation:** Enforce consistent nesting depth based on data structure:
- Scalar values: `math.fieldName`
- Lists: `math.fieldName`: array
- Structured data: `math.fieldName.subField`

---

### 5. **Mixed Naming Conventions for Ranges**

**Problem:** Per-unit ranges use different structures.

**Examples:**
- M01: `math.ranges.cm`: {min, max}
- M02: `math.ranges.cm`: {min, max, interval}
- M04: `math.conversions.hours`: {min, max}
- M06: `math.ranges.miles`: {min, max}

**Current:** Each unit has its own object under `ranges`.
**Issue:** Not scalable, not in schema.

**Recommendation:** Define unified range structure in schema:
```javascript
math.ranges: {
  [unitName]: { min: number, max: number, interval?: number }
}
```

---

### 6. **Flat vs Nested Structure Inconsistency**

**Problem:** N02 still uses FLAT V1 structure, not migrated to V2.

**V1 Example (N02):**
```javascript
{
  min_value: 0,
  max_value: 100,
  operations: [...]
}
```

**V2 Example (N01):**
```javascript
{
  math: { range: { min: 0, max: 100 } },
  operations: [...]
}
```

**Recommendation:** Migrate N02 to V2 nested structure.

---

### 7. **Inconsistent Array vs Scalar for Similar Fields**

**Problem:** Same semantic concept uses different data types.

**Examples:**
- `math.steps`: number (C04) vs `math.sequence.steps`: array<number> (N01)
- `math.decimal`: number (M09) vs `math.decimals.places`: number (C06)
- `math.targets`: array (C01) vs `math.target.min/max`: number (M03)

**Recommendation:** Use arrays when multiple values possible, objects with min/max when ranges.

---

### 8. **Presentation Field Inconsistencies**

**Problem:** `presentation` has wildly different sub-structures across modules.

**Examples:**
- N01: `presentation.gaps.{position, count}`
- N04: `presentation.numberLine.max`, `presentation.objects.types`, `presentation.comparison.words`
- N05: `presentation.contexts`, `presentation.intervalTypes`
- C01: `presentation.styles`
- C02: `presentation.styles`, `presentation.hint`
- C03: `presentation.formats`
- M01: `presentation.useDescriptors`
- M02: `presentation.showAllNumbers`, `presentation.pointerOnMark`
- M04: `presentation.types`, `presentation.sequence`, `presentation.multiStep`

**Current Schema:**
```javascript
presentation: {
  type: 'object',
  required: false,
  structure: {
    contexts: { type: 'array<string>', optional: true },
    visuals: { type: 'boolean', optional: true },
    format: { type: 'string', optional: true }
  }
}
```

**Recommendation:** Expand schema to include:
- `presentation.gaps`: object
- `presentation.styles`: array<string>
- `presentation.formats`: array<string>
- `presentation.hint`: string
- `presentation.numberLine`: object
- `presentation.objects`: object
- `presentation.comparison`: object
- `presentation.types`: array<string>
- `presentation.sequence`: array<string>
- Module-specific booleans as needed

---

### 9. **Context-Specific Range Extensions**

**Problem:** Some modules extend `math.range` with context-specific sub-fields that aren't documented.

**Examples:**
- N05: `math.range.temp`, `math.range.elevation`
- N06: `math.range.negative`, `math.range.interval`
- C06: `math.range.oddEven`, `math.range.factors`, `math.range.whole`, `math.range.num`

**Recommendation:** Either:
1. Move to `math.contexts.{contextName}.range`, OR
2. Document all range sub-field extensions in schema

---

### 10. **Type Mismatches for Similar Concepts**

**Problem:** Similar fields use different types.

**Examples:**
- `math.config.carry`: boolean (C02 Y3) vs string "sometimes" (C07 Y2)
- `math.digits`: array<number> (C02 Y5) vs object {mult: [2,3]} (C07)
- `math.range.result`: array (C02 Y1) vs `math.range.resultMax`: number (C02 Y3)

**Recommendation:** Standardize types or use union types explicitly.

---

## SECTION D: SUMMARY STATISTICS

### Total Fields in Use Across All 24 Modules:
- **Unique Root-Level Fields:** 3 (`operations`, `math`, `presentation`)
- **Unique `math` Sub-Fields:** ~150+ (including all variants)
- **Unique `presentation` Sub-Fields:** ~30+
- **Fields in Current Schema:** ~25 explicitly defined
- **Fields NOT in Schema:** ~155+ (majority)

### Compliance Status:
- **Fully V2-Compliant:** N01, N03, N04, N06, C01, C02 (partial), C03, C04, C05, C06, C07, C08, C09, M01-M09
- **NOT V2-Compliant:** N02 (still flat structure)
- **Custom Fields per Module:** Average 8-12 fields not in schema

### Strand-Specific Custom Fields:
- **Number (N):** 15+ custom fields
- **Calculation (C):** 60+ custom fields
- **Measurement (M):** 80+ custom fields

---

## SECTION E: RECOMMENDATIONS

### 1. **Immediate Actions:**
- Migrate N02 to V2 nested structure
- Document all custom fields currently in use
- Create strand-specific schema extensions

### 2. **Schema Architecture:**
- Keep current V2 root structure: `{ operations, math, presentation }`
- Expand `math` and `presentation` schemas to include strand-specific fields
- Use "optional" flag liberally to allow module-specific customization

### 3. **Naming Standardization:**
- Standardize `math.range.*` sub-field naming
- Use consistent boolean prefixes (`allow*`, `include*`, `use*`, `show*`)
- Standardize nesting depth for similar concepts

### 4. **Validation Strategy:**
- Create **strand-specific schemas** that extend base schema
- Allow custom fields with warning (not error) for forward compatibility
- Provide clear documentation of which fields are required vs optional

---

## SECTION F: NEXT STEPS

1. **Review this inventory** with the team
2. **Decide on schema architecture:** Single unified schema vs strand-specific schemas
3. **Create comprehensive schema definitions** for each strand
4. **Update validation logic** to handle strand-specific fields
5. **Migrate N02** to V2 structure
6. **Document all custom fields** with usage examples
7. **Create migration guide** for future parameter additions

---

**End of Report**
