/**
 * Year 6 C08 Generator: Multi-Step Problems with All Operations
 *
 * Module: C08_Y6_CALC - "Solve problems involving addition, subtraction,
 * multiplication and division"
 *
 * This generator focuses on:
 * - Multi-step problems (2-5 operations)
 * - Ratio and proportion
 * - Percentages
 * - Combined geometry (area, perimeter, volume)
 * - Decimal operations
 * - Fraction/decimal conversions
 * - Mixed units
 * - Algebraic thinking
 * - "Best buy" and value for money problems
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import { generateMultDivDistractors } from './helpers/C08_propertyHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'two_step_mixed':
            return generateTwoStepMixedQuestion(params, level);
        case 'three_step_mixed':
            return generateThreeStepMixedQuestion(params, level);
        case 'four_step_mixed':
            return generateFourStepMixedQuestion(params, level);
        case 'five_step_mixed':
            return generateFiveStepMixedQuestion(params, level);
        case 'ratio_problems':
            return generateRatioProblemsQuestion(params, level);
        case 'proportion_problems':
            return generateProportionProblemsQuestion(params, level);
        case 'percentage_problems':
            return generatePercentageProblemsQuestion(params, level);
        case 'percentage_increase_decrease':
            return generatePercentageIncreaseDecreaseQuestion(params, level);
        case 'compound_percentage':
            return generateCompoundPercentageQuestion(params, level);
        case 'area_perimeter':
            return generateAreaPerimeterQuestion(params, level);
        case 'volume_problems':
            return generateVolumeProblemsQuestion(params, level);
        case 'decimal_operations':
            return generateDecimalOperationsQuestion(params, level);
        case 'fraction_decimal_mix':
            return generateFractionDecimalMixQuestion(params, level);
        case 'mixed_units':
            return generateMixedUnitsQuestion(params, level);
        case 'inverse_proportion':
            return generateInverseProportionQuestion(params, level);
        case 'algebraic_thinking':
            return generateAlgebraicThinkingQuestion(params, level);
        case 'multi_step_reasoning':
            return generateMultiStepReasoningQuestion(params, level);
        case 'best_buy_problems':
            return generateBestBuyProblemsQuestion(params, level);
        default:
            return generateThreeStepMixedQuestion(params, level);
    }
}

function generateTwoStepMixedQuestion(params, level) {
    const a = randomInt(50, 500);
    const b = randomInt(10, 100);
    const c = randomInt(2, 10);
    const answer = (a + b) * c;

    const text = `Calculate (${a} + ${b}) × ${c}`;
    const working = `${a} + ${b} = ${a + b}. ${a + b} × ${c} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'two_step_mixed' }, params, level);
}

function generateThreeStepMixedQuestion(params, level) {
    const a = randomInt(100, 1000);
    const b = randomInt(50, 200);
    const c = randomInt(2, 10);
    const d = randomInt(50, 300);
    const answer = (a - b) + (c * d);

    const text = `A shop has ${a} items. ${b} items are sold. Then ${c} new deliveries arrive, each with ${d} items. How many items does the shop have now?`;
    const working = `${a} - ${b} = ${a - b}. ${c} deliveries × ${d} items = ${c * d}. ${a - b} + ${c * d} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'three_step_mixed' }, params, level);
}

function generateFourStepMixedQuestion(params, level) {
    const start = randomInt(1000, 5000);
    const add1 = randomInt(100, 500);
    const subtract1 = randomInt(50, 300);
    const multiply = randomInt(2, 5);
    const divide = randomInt(2, 5);

    const step1 = start + add1;
    const step2 = step1 - subtract1;
    const step3 = step2 * multiply;
    const answer = Math.floor(step3 / divide);

    const text = `Calculate ((${start} + ${add1} - ${subtract1}) × ${multiply}) ÷ ${divide}`;
    const working = `${start} + ${add1} = ${step1}. ${step1} - ${subtract1} = ${step2}. ${step2} × ${multiply} = ${step3}. ${step3} ÷ ${divide} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'four_step_mixed' }, params, level);
}

function generateFiveStepMixedQuestion(params, level) {
    const a = randomInt(500, 2000);
    const b = randomInt(100, 500);
    const c = randomInt(50, 200);
    const d = randomInt(2, 5);
    const e = randomInt(10, 50);
    const f = randomInt(2, 5);

    const step1 = a + b;
    const step2 = step1 - c;
    const step3 = step2 * d;
    const step4 = step3 + e;
    const answer = Math.floor(step4 / f);

    const text = `Calculate (((${a} + ${b} - ${c}) × ${d}) + ${e}) ÷ ${f}`;
    const working = `${a} + ${b} = ${step1}. ${step1} - ${c} = ${step2}. ${step2} × ${d} = ${step3}. ${step3} + ${e} = ${step4}. ${step4} ÷ ${f} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'five_step_mixed' }, params, level);
}

function generateRatioProblemsQuestion(params, level) {
    const ratio1 = randomInt(2, 5);
    const ratio2 = randomInt(2, 5);
    const total = randomInt(50, 200);

    // Ensure total is divisible by sum of ratios
    const ratioSum = ratio1 + ratio2;
    const adjustedTotal = Math.floor(total / ratioSum) * ratioSum;
    const unit = Math.floor(adjustedTotal / ratioSum);
    const part1 = unit * ratio1;
    const part2 = unit * ratio2;

    const text = `The ratio of boys to girls is ${ratio1}:${ratio2}. There are ${adjustedTotal} students in total. How many boys are there?`;
    const working = `Ratio parts: ${ratio1} + ${ratio2} = ${ratioSum}. Each part = ${adjustedTotal} ÷ ${ratioSum} = ${unit}. Boys = ${ratio1} × ${unit} = ${part1}`;

    return formatQuestion({ text, answer: part1, working, operation: 'ratio_problems' }, params, level);
}

function generateProportionProblemsQuestion(params, level) {
    const items1 = randomInt(2, 5);
    const cost1 = randomInt(5, 20);
    const items2 = randomInt(6, 15);
    const costPerItem = cost1 / items1;
    const answer = items2 * costPerItem;

    const text = `${items1} pencils cost £${cost1}. How much do ${items2} pencils cost?`;
    const working = `Cost per pencil = £${cost1} ÷ ${items1} = £${costPerItem}. ${items2} pencils = ${items2} × £${costPerItem} = £${answer}`;

    return formatQuestion({ text, answer, working, operation: 'proportion_problems' }, params, level);
}

function generatePercentageProblemsQuestion(params, level) {
    const percentage = randomChoice([10, 20, 25, 50, 75]);
    const whole = randomInt(50, 500);
    const answer = (percentage / 100) * whole;

    const text = `Find ${percentage}% of ${whole}`;
    const working = `${percentage}% = ${percentage / 100}. ${percentage / 100} × ${whole} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'percentage_problems' }, params, level);
}

function generatePercentageIncreaseDecreaseQuestion(params, level) {
    const start = randomInt(100, 500);
    const percentage = randomChoice([10, 15, 20, 25]);
    const isIncrease = randomChoice([true, false]);

    const change = (percentage / 100) * start;
    const answer = isIncrease ? start + change : start - change;

    const text = `${isIncrease ? 'Increase' : 'Decrease'} ${start} by ${percentage}%`;
    const working = `${percentage}% of ${start} = ${change}. ${start} ${isIncrease ? '+' : '-'} ${change} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'percentage_increase_decrease' }, params, level);
}

function generateCompoundPercentageQuestion(params, level) {
    const start = randomInt(100, 300);
    const percent1 = randomChoice([10, 20]);
    const percent2 = randomChoice([5, 10, 15]);

    const step1 = start * (1 + percent1 / 100);
    const answer = step1 * (1 - percent2 / 100);

    const text = `Increase ${start} by ${percent1}%, then decrease the result by ${percent2}%`;
    const working = `After ${percent1}% increase: ${start} × ${1 + percent1 / 100} = ${step1}. After ${percent2}% decrease: ${step1} × ${1 - percent2 / 100} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'compound_percentage' }, params, level);
}

function generateAreaPerimeterQuestion(params, level) {
    const length = randomInt(5, 20);
    const width = randomInt(3, 15);
    const area = length * width;
    const perimeter = 2 * (length + width);

    const questionTypes = [
        {
            text: `A rectangle has length ${length} cm and width ${width} cm. What is its area?`,
            answer: area,
            working: `Area = ${length} × ${width} = ${area} cm²`
        },
        {
            text: `A rectangle has length ${length} cm and width ${width} cm. What is its perimeter?`,
            answer: perimeter,
            working: `Perimeter = 2 × (${length} + ${width}) = 2 × ${length + width} = ${perimeter} cm`
        }
    ];

    const problem = randomChoice(questionTypes);
    return formatQuestion({ ...problem, operation: 'area_perimeter' }, params, level);
}

function generateVolumeProblemsQuestion(params, level) {
    const length = randomInt(3, 10);
    const width = randomInt(3, 10);
    const height = randomInt(3, 10);
    const volume = length * width * height;

    const text = `A cuboid has length ${length} cm, width ${width} cm, and height ${height} cm. What is its volume?`;
    const working = `Volume = ${length} × ${width} × ${height} = ${volume} cm³`;

    return formatQuestion({ text, answer: volume, working, operation: 'volume_problems' }, params, level);
}

function generateDecimalOperationsQuestion(params, level) {
    const a = (randomInt(10, 100) / 10).toFixed(1);
    const b = (randomInt(10, 100) / 10).toFixed(1);
    const operation = randomChoice(['+', '-', '×']);

    let answer;
    let working;

    switch(operation) {
        case '+':
            answer = (parseFloat(a) + parseFloat(b)).toFixed(1);
            working = `${a} + ${b} = ${answer}`;
            break;
        case '-':
            answer = (parseFloat(a) - parseFloat(b)).toFixed(1);
            working = `${a} - ${b} = ${answer}`;
            break;
        case '×':
            answer = (parseFloat(a) * parseFloat(b)).toFixed(2);
            working = `${a} × ${b} = ${answer}`;
            break;
    }

    const text = `Calculate ${a} ${operation} ${b}`;

    return formatQuestion({ text, answer: parseFloat(answer), working, operation: 'decimal_operations' }, params, level);
}

function generateFractionDecimalMixQuestion(params, level) {
    const decimal = randomChoice([0.5, 0.25, 0.75, 0.2, 0.4]);
    const number = randomInt(20, 100);
    const answer = decimal * number;

    const fractionMap = { 0.5: '1/2', 0.25: '1/4', 0.75: '3/4', 0.2: '1/5', 0.4: '2/5' };
    const fraction = fractionMap[decimal];

    const text = `Calculate ${decimal} of ${number} (${fraction} as a decimal)`;
    const working = `${decimal} × ${number} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'fraction_decimal_mix' }, params, level);
}

function generateMixedUnitsQuestion(params, level) {
    const meters = randomInt(2, 10);
    const cm = randomInt(10, 99);
    const totalCm = meters * 100 + cm;

    const questionTypes = [
        {
            text: `Convert ${meters} m ${cm} cm to centimeters`,
            answer: totalCm,
            working: `${meters} m = ${meters * 100} cm. ${meters * 100} + ${cm} = ${totalCm} cm`
        },
        {
            text: `Convert ${totalCm} cm to meters and centimeters. How many total centimeters?`,
            answer: totalCm,
            working: `${totalCm} cm = ${meters} m ${cm} cm = ${totalCm} cm total`
        }
    ];

    const problem = randomChoice(questionTypes);
    return formatQuestion({ ...problem, operation: 'mixed_units' }, params, level);
}

function generateInverseProportionQuestion(params, level) {
    const workers = randomInt(4, 10);
    const days = randomInt(6, 20);
    const totalWork = workers * days;
    const newWorkers = randomInt(workers + 2, 15);
    const answer = Math.floor(totalWork / newWorkers);

    const text = `${workers} workers can complete a job in ${days} days. How many days will ${newWorkers} workers take?`;
    const working = `Total work = ${workers} × ${days} = ${totalWork} worker-days. Days = ${totalWork} ÷ ${newWorkers} = ${answer} days`;

    return formatQuestion({ text, answer, working, operation: 'inverse_proportion' }, params, level);
}

function generateAlgebraicThinkingQuestion(params, level) {
    const x = randomInt(5, 20);
    const a = randomInt(2, 5);
    const b = randomInt(10, 30);
    const result = a * x + b;

    const text = `If ${a}x + ${b} = ${result}, find x`;
    const working = `${result} - ${b} = ${result - b}. ${result - b} ÷ ${a} = ${x}`;

    return formatQuestion({ text, answer: x, working, operation: 'algebraic_thinking' }, params, level);
}

function generateMultiStepReasoningQuestion(params, level) {
    const apples = randomInt(10, 30);
    const oranges = randomInt(15, 35);
    const total = apples + oranges;
    const given = randomInt(5, 10);
    const remaining = total - given;

    const text = `A basket has ${apples} apples and ${oranges} oranges. If ${given} pieces of fruit are removed, how many remain?`;
    const working = `Total = ${apples} + ${oranges} = ${total}. Remaining = ${total} - ${given} = ${remaining}`;

    return formatQuestion({ text, answer: remaining, working, operation: 'multi_step_reasoning' }, params, level);
}

function generateBestBuyProblemsQuestion(params, level) {
    const pack1Size = randomInt(3, 6);
    const pack1Price = pack1Size * randomInt(2, 4);
    const pack2Size = randomInt(8, 12);
    const pack2Price = pack2Size * randomInt(2, 3);

    const perItem1 = (pack1Price / pack1Size).toFixed(2);
    const perItem2 = (pack2Price / pack2Size).toFixed(2);

    const text = `Pack A: ${pack1Size} items for £${pack1Price}. Pack B: ${pack2Size} items for £${pack2Price}. Which is better value? Calculate the price per item for each.`;
    const working = `Pack A: £${pack1Price} ÷ ${pack1Size} = £${perItem1} per item. Pack B: £${pack2Price} ÷ ${pack2Size} = £${perItem2} per item. ${perItem1 < perItem2 ? 'Pack A' : 'Pack B'} is better value`;

    return {
        text,
        type: 'text_input',
        answer: (perItem1 < perItem2 ? 'A' : 'B'),
        hint: working,
        module: 'C08_Y6_CALC',
        level: level
    };
}

function formatQuestion(problem, params, level) {
    const useMultipleChoice = params.question_format === 'multiple_choice';
    const answer = typeof problem.answer === 'number' ? problem.answer : (isNaN(parseFloat(problem.answer)) ? problem.answer : parseFloat(problem.answer));

    if (useMultipleChoice && typeof answer === 'number') {
        const distractors = generateMultDivDistractors(answer, problem, problem.operation || 'mixed');
        const options = shuffle([answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y6_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C08_Y6_CALC',
    generate: generateQuestion
};
