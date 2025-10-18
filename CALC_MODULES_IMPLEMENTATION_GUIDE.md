# UK National Curriculum Calculations Modules - Implementation Guide

## Overview

This document provides a comprehensive guide to the 39 calculation modules (C01-C09) for the UK Maths Practice application, covering Years 1-6 of the National Curriculum.

**Date Created:** 2025-10-18
**Status:** Foundation Complete - Templates Ready for Expansion
**Total Modules:** 39 generators across 9 content domains

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Completed Work](#completed-work)
3. [Module Structure by Domain](#module-structure-by-domain)
4. [Implementation Templates](#implementation-templates)
5. [Remaining Work](#remaining-work)
6. [Testing Strategy](#testing-strategy)
7. [Integration Checklist](#integration-checklist)

---

## Architecture Overview

### Three-Layer Parameter-Based Architecture

1. **Curriculum Layer** (`src/curriculum/parameters/C_calculations.js`)
   - Defines all 39 modules with 4 difficulty levels each
   - Parameters organized BY LEVEL (not by parameter type)
   - Levels: 1=Beginning, 2=Developing, 3=Meeting, 4=Exceeding

2. **Generator Layer** (`src/generators/C[XX]_Y[X]_CALC_*.js`)
   - Pure functions taking parameters and level
   - Return question objects matching schema
   - Use helper functions for reusable logic

3. **Engine & UI Layer** (`src/core/questionEngine.js`, `src/ui/app.js`)
   - Registry pattern for generators
   - Question validation and rendering
   - Progress tracking

### Question Object Schema

```javascript
{
    text: string,              // Question text
    type: 'text_input' | 'multiple_choice',
    answer: string,            // ALWAYS string, even for numbers
    // For multiple choice:
    options: Array,            // Array of options
    // For text input:
    hint: string,              // Optional hint
    answers: Array,            // For multi-gap questions
    // Added automatically:
    id: string,
    timestamp: number,
    module: string,
    level: number
}
```

---

## Completed Work

### 1. Helper Functions (`src/generators/helpers/calculationHelpers.js`)

Complete utility library including:

#### Basic Arithmetic
- `generateAddition(minResult, maxResult, options)` - Generate addition problems
- `generateSubtraction(minResult, maxResult, options)` - Generate subtraction problems
- `generateMultiplication(minFactor, maxFactor, tables)` - Generate multiplication
- `generateDivision(minDividend, maxDividend, options)` - Generate division
- `checkCarry(a, b)` - Detect if addition requires carrying
- `checkBorrow(a, b)` - Detect if subtraction requires borrowing

#### Number Properties
- `isPrime(n)` - Check if number is prime
- `getPrimesUpTo(n)` - Get all primes up to n
- `getFactors(n)` - Get all factors
- `getFactorPairs(n)` - Get factor pairs
- `getCommonFactors(a, b)` - Find common factors
- `getGCF(a, b)` - Greatest common factor
- `getLCM(a, b)` - Least common multiple
- `getMultiplesUpTo(n, max)` - Get multiples
- `isPerfectSquare(n)` - Check if perfect square
- `isPerfectCube(n)` - Check if perfect cube
- `getSquaresUpTo(n)` - Get square numbers
- `getCubesUpTo(n)` - Get cube numbers
- `getPrimeFactors(n)` - Get prime factorization

#### Word Problems
- `getRandomName()` - Random names for word problems
- `getRandomItem(category)` - Random objects for contexts
- `getAdditionContext(a, b, answer)` - Addition word problem templates
- `getSubtractionContext(a, b, answer)` - Subtraction word problem templates
- `getMultiplicationContext(a, b, answer)` - Multiplication word problem templates
- `getDivisionContext(dividend, divisor, quotient, remainder)` - Division word problem templates

#### Estimation & Checking
- `roundTo(num, place)` - Round to nearest 10, 100, 1000, etc.
- `estimateOperation(a, b, operation, roundingPlace)` - Estimate result
- `getInverseOperation(operation)` - Get inverse operation
- `generateInverseFact(a, b, operation)` - Create inverse fact

#### Order of Operations
- `evaluateBODMAS(expression)` - Evaluate following BODMAS
- `generateBODMASExpression(complexity)` - Create BODMAS expressions

### 2. Parameters (`src/curriculum/parameters/C_calculations.js`)

**ALL 39 module parameter definitions complete**, including:

#### C01: Mental Addition/Subtraction (4 modules)
- C01_Y1_CALC - Number bonds to 20
- C01_Y2_CALC - Facts to 100
- C01_Y3_CALC - 3-digit mental calculations
- C01_Y5_CALC - Large number mental calculations

#### C02: Written Addition/Subtraction (5 modules)
- C02_Y1_CALC - Addition/subtraction to 20
- C02_Y2_CALC - 2-digit methods
- C02_Y3_CALC - Columnar 3-digit
- C02_Y4_CALC - Columnar 4-digit
- C02_Y5_CALC - Columnar 5+ digits

#### C03: Estimation/Inverse/Check (5 modules)
- C03_Y2_CALC - Inverse operations
- C03_Y3_CALC - Estimate and check
- C03_Y4_CALC - 4-digit estimation
- C03_Y5_CALC - Rounding to check
- C03_Y6_CALC - Appropriate accuracy

#### C04: Addition/Subtraction Problems (6 modules)
- C04_Y1_CALC - One-step problems
- C04_Y2_CALC - Word problems
- C04_Y3_CALC - Missing number problems
- C04_Y4_CALC - Two-step problems
- C04_Y5_CALC - Multi-step problems
- C04_Y6_CALC - Complex multi-step

#### C05: Number Properties (2 modules)
- C05_Y5_CALC - Multiples, factors, primes, squares, cubes
- C05_Y6_CALC - Common factors, multiples, primes

#### C06: Mental Multiplication/Division (5 modules)
- C06_Y2_CALC - Tables 2, 5, 10
- C06_Y3_CALC - Tables 3, 4, 8
- C06_Y4_CALC - Tables to 12×12
- C06_Y5_CALC - Mental with powers of 10
- C06_Y6_CALC - Large number mental calculations

#### C07: Written Multiplication/Division (5 modules)
- C07_Y2_CALC - Multiplication statements
- C07_Y3_CALC - 2-digit × 1-digit
- C07_Y4_CALC - Formal written multiplication
- C07_Y5_CALC - Long multiplication & short division
- C07_Y6_CALC - Long division

#### C08: Problem Solving with All Operations (6 modules)
- C08_Y1_CALC - Grouping/sharing problems
- C08_Y2_CALC - Commutative properties
- C08_Y3_CALC - Scaling & correspondence
- C08_Y4_CALC - Distributive law
- C08_Y5_CALC - Factors/multiples/squares/cubes in problems
- C08_Y6_CALC - Multi-operation problems

#### C09: Order of Operations (1 module)
- C09_Y6_CALC - BODMAS/PEMDAS

### 3. Complete Generator Templates

Three fully-functional generators demonstrating different complexities:

#### Simple: `C01_Y1_CALC_number_bonds.js`
- 6 operations covering curriculum objectives
- Demonstrates basic bond questions
- Word problem contexts
- Fact families and inverse operations
- **Template for:** C01, C02, C06 series

#### Complex: `C05_Y5_CALC_number_properties.js`
- 10 operations covering all number properties
- Multiples, factors, factor pairs, common factors
- Primes, composites, prime factors
- Squares, cubes, notation
- **Template for:** C05, C07 series

#### Advanced: `C09_Y6_CALC_bodmas.js`
- 11 operations for order of operations
- Expression generation and evaluation
- Bracket handling (including nested)
- Step identification
- **Template for:** C03, C04, C08, C09 series

### 4. Integration

- Parameters imported into `src/curriculum/parameters.js`
- Ready for generator registration in `src/core/questionEngine.js`

---

## Module Structure by Domain

### C01: Add/Subtract Mentally (4 modules)

**Digital Adaptation:** All mental strategies can be assessed through text-based questions with multiple choice or text input.

#### C01_Y1_CALC: Number Bonds to 20
**Curriculum:** "Represent and use number bonds and related subtraction facts within 20"

**Operations:**
1. **Bonds to Target** - Find pairs that make 5, 10, 15, 20
2. **Missing Addend** - Solve ___ + 5 = 10
3. **Related Subtraction** - Use bonds for subtraction (20 - 12 = ___)
4. **Fact Families** - Recognize related facts (5+7=12, 12-7=5)
5. **Inverse Check** - Use inverse to check calculations

**Progression:**
- Level 1: Bonds to 5 and 10
- Level 2: Bonds to 10 and 20
- Level 3: All bonds within 20
- Level 4: Fluent with multi-step bond problems

**Template:** `C01_Y1_CALC_number_bonds.js` ✅ COMPLETE

---

#### C01_Y2_CALC: Mental Addition & Subtraction to 100
**Curriculum:** "Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100"

**Operations:**
1. **Recall Facts** - Quick recall of bonds to 20
2. **Derive Facts** - Use known facts to find new ones (5+7=12, so 50+70=120)
3. **Add/Subtract Ones** - 34 + 5, 48 - 3
4. **Add/Subtract Tens** - 34 + 20, 67 - 30
5. **Bridging Tens** - 38 + 5 (cross 40)
6. **Near Multiples** - 49 + 16 = 50 + 15
7. **Compensation** - 28 + 19 = 28 + 20 - 1

**Progression:**
- Level 1: Facts to 20, derive to 30
- Level 2: Derive to 50
- Level 3: Derive to 100
- Level 4: Fluent with all strategies to 100

**Template Pattern:** Similar to C01_Y1, add derivation operations

---

#### C01_Y3_CALC: Mental Calculations with 3-digit Numbers
**Curriculum:** "Add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds"

**Operations:**
1. **Add Ones** - 345 + 7
2. **Subtract Ones** - 562 - 4
3. **Add Tens** - 345 + 30
4. **Subtract Tens** - 582 - 50
5. **Add Hundreds** - 345 + 200
6. **Subtract Hundreds** - 782 - 300
7. **Mixed Place Values** - Combine operations

**Progression:**
- Level 1: 3-digit + ones only
- Level 2: 3-digit + tens
- Level 3: 3-digit + hundreds
- Level 4: All combinations with bridging

**Template Pattern:** Place value focused, similar to C01_Y1

---

#### C01_Y5_CALC: Mental Calculations with Large Numbers
**Curriculum:** "Add and subtract numbers mentally with increasingly large numbers"

**Operations:**
1. **Add/Subtract Powers of 10** - 4567 + 1000
2. **Near Multiples** - 4998 + 156 = 5000 + 154
3. **Compensation** - 7999 + 234 = 8000 + 233
4. **Partitioning** - 4567 + 234 = 4500 + 200 + 67 + 34
5. **Rounding and Adjusting** - Round, calculate, adjust

**Progression:**
- Level 1: 4-digit numbers
- Level 2: 5-digit numbers
- Level 3: 6-digit numbers
- Level 4: 7-digit numbers

**Template Pattern:** Large number mental strategies

---

### C02: Add/Subtract Using Written Methods (5 modules)

**Digital Adaptation:** Show equations and results. For columnar addition/subtraction, present vertically aligned text or describe the process step-by-step.

#### C02_Y1_CALC: Addition & Subtraction to 20
**Curriculum:** "Add and subtract one-digit and two-digit numbers to 20, including zero; read, write and interpret mathematical statements involving addition (+), subtraction (–) and equals (=) signs"

**Operations:**
1. **Simple Addition** - 5 + 7 = ___
2. **Simple Subtraction** - 12 - 5 = ___
3. **Read Statements** - "What does 5 + 3 = 8 mean?"
4. **Write Statements** - "Write an addition for this picture"
5. **Interpret Equals** - Understand 7 = 4 + 3 (reversed)
6. **Missing Numbers** - 7 = ___ - 9

**Progression:**
- Level 1: Single digit to 10
- Level 2: Single digit to 20
- Level 3: Two-digit + one-digit to 20
- Level 4: All combinations, including zero

**Template Pattern:** Similar to C01_Y1, focus on statement reading/writing

---

#### C02_Y2_CALC: Addition & Subtraction Methods
**Curriculum:** "Add and subtract numbers using concrete objects, pictorial representations, and mentally, including: a two-digit number and ones, a two-digit number and tens, two two-digit numbers, adding three one-digit numbers"

**Operations:**
1. **Two-digit + Ones** - 34 + 5
2. **Two-digit - Ones** - 47 - 3
3. **Two-digit + Tens** - 34 + 20
4. **Two-digit - Tens** - 67 - 30
5. **Two-digit + Two-digit** - 34 + 25
6. **Two-digit - Two-digit** - 67 - 32
7. **Three One-digit** - 5 + 7 + 3

**Progression:**
- Level 1: 2-digit + ones (to 50)
- Level 2: 2-digit + tens (to 99)
- Level 3: Two 2-digit numbers
- Level 4: All combinations

**Template Pattern:** Extend C01_Y2 with written methods

---

#### C02_Y3_CALC: Columnar Addition & Subtraction (3 digits)
**Curriculum:** "Add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction"

**Operations:**
1. **Columnar Addition** - Vertical format
2. **Columnar Subtraction** - Vertical format
3. **With Carrying** - Regrouping required
4. **With Borrowing** - Exchanging required
5. **Mixed** - Choose method

**Progression:**
- Level 1: No carrying/borrowing
- Level 2: With carrying
- Level 3: With borrowing
- Level 4: All cases

**Template Pattern:** Focus on columnar method visualization

---

#### C02_Y4_CALC: Columnar Addition & Subtraction (4 digits)
**Curriculum:** "Add and subtract numbers with up to 4 digits using the formal written methods of columnar addition and subtraction where appropriate"

**Operations:**
1. **Columnar Addition (4-digit)**
2. **Columnar Subtraction (4-digit)**
3. **Multi-addend** - Adding 3+ numbers

**Progression:**
- Level 1: No carrying/borrowing (4-digit)
- Level 2: With carrying
- Level 3: With borrowing
- Level 4: All cases + multi-addend

**Template Pattern:** Same as C02_Y3, larger numbers

---

#### C02_Y5_CALC: Columnar Addition & Subtraction (5+ digits)
**Curriculum:** "Add and subtract whole numbers with more than 4 digits, including using formal written methods (columnar addition and subtraction)"

**Operations:**
1. **Columnar Addition (5+ digits)**
2. **Columnar Subtraction (5+ digits)**
3. **Mixed Operations**
4. **Complex Multi-addend**

**Progression:**
- Level 1: 5-digit
- Level 2: 6-digit
- Level 3: 7-digit
- Level 4: 8-digit

**Template Pattern:** Same as C02_Y3/Y4, even larger numbers

---

### C03: Estimate, Use Inverses and Check (5 modules)

**Digital Adaptation:** Present calculations and ask students to estimate, check using inverse, or identify errors.

#### C03_Y2_CALC: Inverse Operations
**Curriculum:** "Recognise and use the inverse relationship between addition and subtraction and use this to check calculations and missing number problems"

**Operations:**
1. **Show Inverse** - If 5 + 7 = 12, then 12 - 7 = 5
2. **Check Calculation** - Check 34 + 25 = 59 by doing 59 - 25
3. **Missing Number Inverse** - Use inverse to find missing number
4. **Fact Families** - Complete fact family
5. **Error Detection** - Find and fix errors using inverse

**Progression:**
- Level 1: Simple inverse (to 20)
- Level 2: Inverse to 50
- Level 3: Inverse to 100
- Level 4: Complex problems

**Template Pattern:** Similar to C01_Y1, focus on inverse relationships

---

#### C03_Y3_CALC: Estimate and Check with Inverses
**Curriculum:** "Estimate the answer to a calculation and use inverse operations to check answers"

**Operations:**
1. **Estimate to 10** - Round to nearest 10 and estimate
2. **Estimate to 100** - Round to nearest 100 and estimate
3. **Check with Inverse** - Use inverse to verify
4. **Error Detection** - Is the answer reasonable?
5. **Reasonable Answer** - Choose reasonable estimate

**Progression:**
- Level 1: Estimate to nearest 10
- Level 2: Estimate to 10 or 100
- Level 3: 3-digit calculations
- Level 4: Complex estimation

**Template Pattern:** Combine estimation with inverse checking

---

#### C03_Y4_CALC, C03_Y5_CALC, C03_Y6_CALC
Follow similar pattern with increasing number sizes and complexity of estimation strategies.

---

### C04: Add/Subtract to Solve Problems (6 modules)

**Digital Adaptation:** Word problems presented as text with multiple choice or text input answers.

#### C04_Y1_CALC through C04_Y6_CALC

**Operations (all modules):**
1. **Addition Problems** - Word problems requiring addition
2. **Subtraction Problems** - Word problems requiring subtraction
3. **Comparison Problems** - "How many more?" questions
4. **Missing Number Problems** - Problems with unknowns
5. **Change Problems** - Increase/decrease scenarios
6. **Multi-step Problems** - (Years 3-6) Combine operations

**Progression across years:**
- Year 1: One-step, to 20, pictorial support
- Year 2: One-step, to 100, various contexts
- Year 3: Missing numbers, to 999, two-step
- Year 4: Two-step, to 9999, decide operations
- Year 5: Multi-step, large numbers, justify methods
- Year 6: Complex multi-step, decimals, real-world

**Template Pattern:** Similar to N06 problems generators, calculation-focused

---

### C05: Properties of Number (2 modules)

**Digital Adaptation:** All number properties can be tested digitally through identification, calculation, and reasoning questions.

#### C05_Y5_CALC: Number Properties
**Template:** `C05_Y5_CALC_number_properties.js` ✅ COMPLETE

(See completed template above for full operation details)

---

#### C05_Y6_CALC: Factors, Multiples and Primes
**Curriculum:** "Identify common factors, common multiples and prime numbers"

**Operations:**
1. **Common Factors** - Find factors shared by two numbers
2. **Highest Common Factor (HCF)** - Find GCF
3. **Common Multiples** - Find multiples shared by two numbers
4. **Lowest Common Multiple (LCM)** - Find LCM
5. **Identify Primes** - Primes beyond 100
6. **Prime Factorization** - Express as product of primes
7. **Problem Solving** - Apply in contexts

**Progression:**
- Level 1: Common factors to 100
- Level 2: Common multiples
- Level 3: Primes beyond 100
- Level 4: Complex problems

**Template Pattern:** Similar to C05_Y5, focus on common factors/multiples

---

### C06: Multiply/Divide Mentally (5 modules)

**Digital Adaptation:** Times tables and mental calculations work perfectly in digital format.

#### C06_Y2_CALC through C06_Y6_CALC

**Key differences by year:**
- Year 2: Tables 2, 5, 10; odd/even recognition
- Year 3: Tables 3, 4, 8
- Year 4: All tables to 12×12; ×0, ×1, ÷1; factor pairs; commutativity
- Year 5: Mental with known facts; ×÷ by 10, 100, 1000; decimals
- Year 6: Large numbers; mixed operations; derived facts

**Operations (common across years):**
1. **Recall Multiplication Facts**
2. **Recall Division Facts**
3. **Odd/Even Recognition** (Y2)
4. **Missing Number Multiply/Divide**
5. **Factor Pairs** (Y4+)
6. **Commutativity** (Y4+)
7. **Three Numbers** (Y4+)
8. **Powers of 10** (Y5+)
9. **Derived Facts** (Y5-Y6)
10. **Word Problems**

**Template Pattern:** Table-based with progressive operations

---

### C07: Multiply/Divide Using Written Methods (5 modules)

**Digital Adaptation:** Show vertical layouts as text; focus on final answers rather than showing working (or offer step-by-step hints).

#### C07_Y2_CALC through C07_Y6_CALC

**Key differences by year:**
- Year 2: Write statements with ×, ÷, = signs (tables 2, 5, 10)
- Year 3: 2-digit × 1-digit, progressing to formal methods
- Year 4: Formal written multiplication (grid/columnar)
- Year 5: Long multiplication; short division; remainders
- Year 6: Long division; interpret remainders (whole, fraction, rounding)

**Operations (vary by year):**
1. **Write Multiplication Statements** (Y2)
2. **Formal Multiplication Layout**
3. **Grid Method** (Y3-Y4)
4. **Columnar Method** (Y4-Y6)
5. **Long Multiplication** (Y5-Y6)
6. **Short Division** (Y5)
7. **Long Division** (Y6)
8. **Interpret Remainders** (Y5-Y6)

**Template Pattern:** Focus on method application and answer correctness

---

### C08: Solve Problems (Commutative, Associative, Distributive) (6 modules)

**Digital Adaptation:** Word problems and property demonstrations work well digitally.

#### C08_Y1_CALC through C08_Y6_CALC

**Key differences by year:**
- Year 1: Grouping/sharing with arrays
- Year 2: Show commutativity (addition, multiplication); non-commutativity (subtraction, division)
- Year 3: Scaling problems; correspondence (n to m)
- Year 4: Distributive law; harder correspondence
- Year 5: Factors/multiples in problems; all four operations; scaling by fractions; rates
- Year 6: Multi-operation problems; choose methods

**Operations (common themes):**
1. **Grouping Problems** (Y1-Y3)
2. **Sharing Problems** (Y1-Y3)
3. **Array Problems** (Y1-Y2)
4. **Commutative Property** (Y2)
5. **Scaling** (Y3-Y5)
6. **Correspondence** (Y3-Y4)
7. **Distributive Law** (Y4)
8. **All Four Operations** (Y5-Y6)
9. **Multi-step** (Y4-Y6)

**Template Pattern:** Problem-solving focus, property demonstration

---

### C09: Order of Operations (1 module)

**Digital Adaptation:** Perfect for digital format - evaluate expressions, identify steps.

#### C09_Y6_CALC: BODMAS
**Template:** `C09_Y6_CALC_bodmas.js` ✅ COMPLETE

(See completed template above for full operation details)

---

## Implementation Templates

### Template 1: Simple Operations (C01, C02, C06)

```javascript
/**
 * [Module Name] Question Generator
 *
 * Module: [MODULE_ID] - "[Curriculum statement]"
 *
 * Operations:
 * 1. [Operation 1 description]
 * 2. [Operation 2 description]
 * ...
 */

import {
    // Import from calculationHelpers
    generateAddition,
    getRandomName,
    getRandomItem
} from './helpers/calculationHelpers.js';

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'operation1':
            return generateOperation1(params, level);
        case 'operation2':
            return generateOperation2(params, level);
        // ...
        default:
            return generateOperation1(params, level);
    }
}

/**
 * OPERATION 1: [Name]
 * [Description]
 */
function generateOperation1(params, level) {
    // Generate problem
    const { a, b, answer } = generateAddition(0, params.max_value);

    // Create question text
    const text = `What is ${a} + ${b}?`;

    // Generate distractors
    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add the two numbers`,
        module: '[MODULE_ID]',
        level: level
    };
}

// More operations...

/**
 * Export generator
 */
export default {
    moduleId: '[MODULE_ID]',
    generate: generateQuestion
};
```

---

### Template 2: Number Properties (C05)

Use `C05_Y5_CALC_number_properties.js` as the complete template. Key features:

- Multiple operation types in switch statement
- Heavy use of number property helpers (getFactors, isPrime, etc.)
- Generated distractors based on wrong answers
- Clear hint messages

---

### Template 3: Complex Problems (C03, C04, C08)

```javascript
/**
 * [Module Name] Question Generator
 *
 * Module: [MODULE_ID] - "[Curriculum statement]"
 */

import {
    generateAddition,
    generateSubtraction,
    estimateOperation,
    getRandomName,
    getRandomItem,
    getAdditionContext
} from './helpers/calculationHelpers.js';

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'word_problem':
            return generateWordProblem(params, level);
        case 'estimation':
            return generateEstimation(params, level);
        case 'multi_step':
            return generateMultiStep(params, level);
        default:
            return generateWordProblem(params, level);
    }
}

/**
 * Word Problem Generator
 */
function generateWordProblem(params, level) {
    const { a, b, answer } = generateAddition(10, params.max_value);

    // Get context template
    const context = getAdditionContext(a, b, answer);

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: context.text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `This is an addition problem: ${a} + ${b}`,
        module: '[MODULE_ID]',
        level: level
    };
}

// More operations...

export default {
    moduleId: '[MODULE_ID]',
    generate: generateQuestion
};
```

---

### Template 4: BODMAS (C09)

Use `C09_Y6_CALC_bodmas.js` as the complete template. Key features:

- Expression generation with safe evaluation
- Bracket handling
- Step identification
- Wrong answer generation by ignoring order
- Nested structures

---

## Remaining Work

### To Create: 36 Additional Generators

Using the templates above, create the remaining generators:

#### C01 Series (3 remaining)
- [ ] `C01_Y2_CALC_mental_to_100.js` - Use Template 1
- [ ] `C01_Y3_CALC_mental_3digit.js` - Use Template 1
- [ ] `C01_Y5_CALC_mental_large.js` - Use Template 1

#### C02 Series (5 remaining)
- [ ] `C02_Y1_CALC_to_20.js` - Use Template 1
- [ ] `C02_Y2_CALC_methods.js` - Use Template 1
- [ ] `C02_Y3_CALC_columnar_3digit.js` - Use Template 1 + columnar visualization
- [ ] `C02_Y4_CALC_columnar_4digit.js` - Use Template 1 + columnar visualization
- [ ] `C02_Y5_CALC_columnar_5digit.js` - Use Template 1 + columnar visualization

#### C03 Series (5 remaining)
- [ ] `C03_Y2_CALC_inverse.js` - Use Template 3
- [ ] `C03_Y3_CALC_estimate_check.js` - Use Template 3
- [ ] `C03_Y4_CALC_estimate_4digit.js` - Use Template 3
- [ ] `C03_Y5_CALC_rounding.js` - Use Template 3
- [ ] `C03_Y6_CALC_accuracy.js` - Use Template 3

#### C04 Series (6 remaining)
- [ ] `C04_Y1_CALC_problems.js` - Use Template 3
- [ ] `C04_Y2_CALC_word_problems.js` - Use Template 3
- [ ] `C04_Y3_CALC_problem_solving.js` - Use Template 3
- [ ] `C04_Y4_CALC_two_step.js` - Use Template 3
- [ ] `C04_Y5_CALC_multi_step.js` - Use Template 3
- [ ] `C04_Y6_CALC_complex.js` - Use Template 3

#### C05 Series (1 remaining)
- [ ] `C05_Y6_CALC_factors_multiples_primes.js` - Use Template 2 (adapt C05_Y5)

#### C06 Series (5 remaining)
- [ ] `C06_Y2_CALC_tables_2_5_10.js` - Use Template 1
- [ ] `C06_Y3_CALC_tables_3_4_8.js` - Use Template 1
- [ ] `C06_Y4_CALC_tables_to_12.js` - Use Template 1
- [ ] `C06_Y5_CALC_mental_multiply_divide.js` - Use Template 1
- [ ] `C06_Y6_CALC_large_numbers.js` - Use Template 1

#### C07 Series (5 remaining)
- [ ] `C07_Y2_CALC_statements.js` - Use Template 1
- [ ] `C07_Y3_CALC_written_methods.js` - Use Template 1
- [ ] `C07_Y4_CALC_formal_written.js` - Use Template 1
- [ ] `C07_Y5_CALC_long_mult_short_div.js` - Use Template 1
- [ ] `C07_Y6_CALC_long_division.js` - Use Template 1

#### C08 Series (6 remaining)
- [ ] `C08_Y1_CALC_mult_div_problems.js` - Use Template 3
- [ ] `C08_Y2_CALC_properties.js` - Use Template 3
- [ ] `C08_Y3_CALC_scaling.js` - Use Template 3
- [ ] `C08_Y4_CALC_distributive.js` - Use Template 3
- [ ] `C08_Y5_CALC_complex_problems.js` - Use Template 3
- [ ] `C08_Y6_CALC_multi_operation.js` - Use Template 3

---

## Testing Strategy

### Unit Testing Each Generator

For each generator, test:

1. **All Operations Generate Valid Questions**
   ```javascript
   // Test each operation type
   const params = getParameters('C01_Y1_CALC', 1);
   for (const operation of params.operations) {
       const question = generateQuestion(params, 1);
       assert(question.text, 'Question has text');
       assert(question.answer, 'Question has answer');
       assert(question.type, 'Question has type');
   }
   ```

2. **Answer Correctness**
   ```javascript
   // Verify mathematical correctness
   const question = generateQuestion(params, level);
   if (question.type === 'multiple_choice') {
       assert(question.options.includes(parseInt(question.answer)));
   }
   ```

3. **Parameter Compliance**
   ```javascript
   // Ensure generated numbers respect parameter bounds
   const question = generateQuestion(params, level);
   // Extract numbers from question and verify <= max_value
   ```

4. **Progressive Difficulty**
   ```javascript
   // Test all 4 levels
   for (let level = 1; level <= 4; level++) {
       const question = generateQuestion(getParameters(moduleId, level), level);
       console.log(`Level ${level}:`, question.text);
       // Manually verify difficulty increases
   }
   ```

### Integration Testing

1. **Generator Registration**
   - All generators registered in questionEngine.js
   - No duplicate module IDs
   - All generate successfully

2. **UI Rendering**
   - Questions display correctly
   - Options render properly
   - Hints display appropriately
   - Answer validation works

3. **Parameter Validation**
   - All modules have 4 levels
   - All levels have required parameters
   - No missing operations

---

## Integration Checklist

### For Each New Generator

- [ ] Create generator file in `src/generators/`
- [ ] Import calculator helpers as needed
- [ ] Implement all operations from parameters
- [ ] Test each operation independently
- [ ] Test all 4 difficulty levels
- [ ] Verify answer correctness
- [ ] Add generator import to `src/core/questionEngine.js`
- [ ] Register generator in `registerDefaultGenerators()`
- [ ] Test in UI
- [ ] Verify curriculum alignment

### Example Registration in questionEngine.js

```javascript
import C01_Y1_Generator from '../generators/C01_Y1_CALC_number_bonds.js';
import C01_Y2_Generator from '../generators/C01_Y2_CALC_mental_to_100.js';
// ... all generators

registerDefaultGenerators() {
    // ... existing N-series generators

    // C01 series
    this.register(C01_Y1_Generator);
    this.register(C01_Y2_Generator);
    this.register(C01_Y3_Generator);
    this.register(C01_Y5_Generator);

    // C02 series
    this.register(C02_Y1_Generator);
    this.register(C02_Y2_Generator);
    this.register(C02_Y3_Generator);
    this.register(C02_Y4_Generator);
    this.register(C02_Y5_Generator);

    // C03 series
    this.register(C03_Y2_Generator);
    this.register(C03_Y3_Generator);
    this.register(C03_Y4_Generator);
    this.register(C03_Y5_Generator);
    this.register(C03_Y6_Generator);

    // C04 series
    this.register(C04_Y1_Generator);
    this.register(C04_Y2_Generator);
    this.register(C04_Y3_Generator);
    this.register(C04_Y4_Generator);
    this.register(C04_Y5_Generator);
    this.register(C04_Y6_Generator);

    // C05 series
    this.register(C05_Y5_Generator);
    this.register(C05_Y6_Generator);

    // C06 series
    this.register(C06_Y2_Generator);
    this.register(C06_Y3_Generator);
    this.register(C06_Y4_Generator);
    this.register(C06_Y5_Generator);
    this.register(C06_Y6_Generator);

    // C07 series
    this.register(C07_Y2_Generator);
    this.register(C07_Y3_Generator);
    this.register(C07_Y4_Generator);
    this.register(C07_Y5_Generator);
    this.register(C07_Y6_Generator);

    // C08 series
    this.register(C08_Y1_Generator);
    this.register(C08_Y2_Generator);
    this.register(C08_Y3_Generator);
    this.register(C08_Y4_Generator);
    this.register(C08_Y5_Generator);
    this.register(C08_Y6_Generator);

    // C09 series
    this.register(C09_Y6_Generator);
}
```

---

## Summary of Files Created

### Helper Files
1. **`src/generators/helpers/calculationHelpers.js`** ✅
   - 1000+ lines of arithmetic, number properties, and problem-solving utilities
   - Used by all C-series generators

### Parameter Files
2. **`src/curriculum/parameters/C_calculations.js`** ✅
   - All 39 module parameter definitions
   - 4 levels per module (1-4)
   - Complete operation lists and progression

3. **`src/curriculum/parameters.js`** ✅ (Updated)
   - Import C_MODULES
   - Merge into MODULES export

### Generator Files (3 complete, 36 to create)
4. **`src/generators/C01_Y1_CALC_number_bonds.js`** ✅
   - Template for simple mental calculation generators
   - 6 operations
   - Word problem integration

5. **`src/generators/C05_Y5_CALC_number_properties.js`** ✅
   - Template for number properties generators
   - 10 operations
   - Complex number theory questions

6. **`src/generators/C09_Y6_CALC_bodmas.js`** ✅
   - Template for order of operations
   - 11 operations
   - Expression generation and evaluation

### Documentation
7. **`CALC_MODULES_IMPLEMENTATION_GUIDE.md`** ✅ (This file)
   - Complete implementation roadmap
   - Templates and patterns
   - Testing strategy
   - Integration checklist

---

## Next Steps

1. **Create remaining 36 generators** using the templates provided
2. **Register all generators** in questionEngine.js
3. **Test each module** at all 4 levels
4. **Verify curriculum alignment** against CSV
5. **UI testing** to ensure proper rendering
6. **Documentation** for each generator

---

## Architectural Decisions

### Why Parameter-Based Architecture?
- **Flexibility:** Easy to adjust difficulty without code changes
- **Consistency:** All generators follow same pattern
- **Maintainability:** Parameters separate from logic
- **Testability:** Easy to test at different difficulty levels

### Why Pure Functions?
- **Predictability:** Same inputs = same question type
- **No Side Effects:** Generators don't modify state
- **Easy Testing:** Simple to unit test

### Why Helper Functions?
- **DRY Principle:** Reuse arithmetic logic across generators
- **Correctness:** Centralize calculations to ensure accuracy
- **Efficiency:** Avoid duplicating complex algorithms

### Why 3-5 Operations Per Module?
- **Quality over Quantity:** Better to have well-designed operations than many similar ones
- **Curriculum Coverage:** 3-5 operations cover full breadth of each objective
- **Avoid Redundancy:** Prevent 10 variations of the same question

### Why Text-Based Digital Adaptation?
- **Accessibility:** Works across all devices
- **Simplicity:** No complex graphics required
- **Curriculum Alignment:** Matches objectives precisely
- **Scalability:** Easy to generate variations

---

## Contact & Support

For questions or issues with this implementation:

1. Review this guide and the three complete template generators
2. Check existing N-series generators for additional patterns
3. Consult CLAUDE.md for architecture overview
4. Test thoroughly before integration

---

**End of Implementation Guide**
