/**
 * Question Generator Demo
 *
 * Interactive demo for the curriculum parameter system
 * Demonstrates question generation with multiple digital-ready formats
 */

// Import MODULES from external file
import { MODULES as IMPORTED_MODULES } from '../src/curriculum/modules.js';

// Import question generators
import { generateCountingQuestion } from '../src/generators/N01_Y1_NPV_counting.js';
import { generateBondsQuestion } from '../src/generators/C01_Y1_CALC_bonds.js';
import { generateMultiplyQuestion } from '../src/generators/C06_Y3_CALC_multiply.js';
import { generateFractionsQuestion } from '../src/generators/F02_Y4_FRAC_fractions.js';

// Map old IDs to new curriculum IDs for backward compatibility
const ID_MAPPING = {
    'Y1_N1_counting': 'N01_Y1_NPV',
    'Y1_C1_bonds': 'C01_Y1_CALC',
    'Y2_N1_place_value': 'N03_Y2_NPV',
    'Y3_C2_multiply': 'C06_Y3_CALC',
    'Y4_F1_fractions': 'F02_Y4_FRAC',
    'Y5_F2_decimals': 'F08_Y5_FRAC'
};

// Create modules object with old IDs mapped to new module definitions
const MODULES = {};
for (const [oldId, newId] of Object.entries(ID_MAPPING)) {
    if (IMPORTED_MODULES[newId]) {
        MODULES[oldId] = {
            ...IMPORTED_MODULES[newId],
            id: oldId  // Keep old ID for HTML compatibility
        };
    }
}

// Map old IDs to generator functions
const GENERATORS = {
    'Y1_N1_counting': generateCountingQuestion,
    'Y1_C1_bonds': generateBondsQuestion,
    'Y2_N1_place_value': null,  // No generator yet for place value
    'Y3_C2_multiply': generateMultiplyQuestion,
    'Y4_F1_fractions': generateFractionsQuestion,
    'Y5_F2_decimals': null  // No generator yet for decimals
};

const contexts = {
    counting: ['counting steps', 'counting money', 'counting objects', 'counting jumps on a number line'],
    money: ['pounds', 'pence', 'coins', 'savings'],
    objects: ['apples', 'pencils', 'books', 'sweets', 'toys', 'stickers', 'marbles'],
    animals: ['cats', 'dogs', 'birds', 'rabbits', 'fish', 'butterflies'],
    people: ['children', 'students', 'friends', 'people'],
    measurement: ['metres', 'centimetres', 'litres', 'grams', 'kilograms']
};

let currentModule = 'Y1_N1_counting';
let currentLevel = 3;
let generatedQuestions = [];

function init() {
    renderModuleList();
    renderLevelButtons();
    updateDisplay();
}

function renderModuleList() {
    const list = document.getElementById('moduleList');
    list.innerHTML = Object.values(MODULES).map(m => `
        <button class="module-btn ${m.id === currentModule ? 'active' : ''}" onclick="selectModule('${m.id}')">
            <div class="year">${m.year} - ${m.ref}</div>
            <div class="title">${m.strand}</div>
            <div class="year">${m.substrand}</div>
        </button>
    `).join('');
}

function renderLevelButtons() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = parseInt(btn.dataset.level);
            selectLevel(level);
        });
    });
}

function selectModule(moduleId) {
    currentModule = moduleId;
    generatedQuestions = [];
    renderModuleList();
    updateDisplay();
}

function selectLevel(level) {
    currentLevel = level;
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.level) === level);
    });
    generatedQuestions = [];
    updateDisplay();
}

function updateDisplay() {
    const module = MODULES[currentModule];

    document.getElementById('moduleTitle').textContent = `${module.year}: ${module.strand}`;
    document.getElementById('moduleDesc').textContent = module.description;
    document.getElementById('moduleBadge').textContent = `${module.substrand} (${module.ref})`;

    renderParameters(module);

    document.getElementById('questionsList').innerHTML = '';
    document.getElementById('exportSection').style.display = 'none';
    document.getElementById('statsPanel').style.display = 'none';
}

function renderParameters(module) {
    const grid = document.getElementById('paramsGrid');
    const params = module.parameters;

    grid.innerHTML = Object.entries(params).map(([key, values]) => {
        const currentValue = values[currentLevel];
        const valueDisplay = Array.isArray(currentValue)
            ? currentValue.join(', ')
            : typeof currentValue === 'boolean'
            ? (currentValue ? 'Yes' : 'No')
            : currentValue;

        const progression = [1,2,3,4].map(l => {
            const val = values[l];
            const display = Array.isArray(val) ? val.join(', ') : String(val);
            return `L${l}: ${display}`;
        }).join('<br>');

        return `
            <div class="param-card">
                <div class="param-name">${key.replace(/_/g, ' ')}</div>
                <div class="param-value">${valueDisplay}</div>
                <div class="param-progression">${progression}</div>
            </div>
        `;
    }).join('');
}

document.getElementById('generateBtn').addEventListener('click', generateQuestions);

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateQuestions() {
    const module = MODULES[currentModule];
    const count = parseInt(document.getElementById('questionCount').value) || 10;
    generatedQuestions = [];

    for (let i = 0; i < count; i++) {
        const question = generateQuestion(module, currentLevel);
        if (question) generatedQuestions.push(question);
    }

    displayQuestions();
}

function generateQuestion(module, level) {
    const params = module.parameters;
    const generator = GENERATORS[module.id];

    // Get parameters for this level
    const levelParams = {};
    for (const [key, values] of Object.entries(params)) {
        levelParams[key] = values[level];
    }

    // Use external generator if available
    if (generator) {
        const question = generator(levelParams, level);
        // Convert question format from generator to MVP format
        return convertQuestionFormat(question);
    }

    // Fallback to inline generation for modules without generators
    return generateInlineQuestion(module, level, levelParams);
}

function convertQuestionFormat(question) {
    // Generator questions have: text, type, answer, options (optional), hint (optional)
    // MVP format needs: text, answer, format, interaction, interactive (optional), visual (optional)

    const converted = {
        text: question.text,
        answer: question.answer
    };

    // Map question type to format and interaction
    if (question.type === 'multiple_choice') {
        converted.format = 'Multiple Choice';
        converted.interaction = 'Click';
        if (question.options) {
            converted.interactive = `Click: ${question.options.map(o => `[${o}]`).join(' ')}`;
        }
    } else if (question.type === 'text_input') {
        converted.format = 'Fill in the Blank';
        converted.interaction = 'Type Answer';
    }

    if (question.hint) {
        converted.hint = question.hint;
    }

    return converted;
}

function generateInlineQuestion(module, level, params) {
    const type = 'standard';  // Default type for inline generation
    return generateSpecificQuestion(module, level, type, params);
}

function generateSpecificQuestion(module, level, type, params) {
    // This function now only handles modules without external generators
    // (place_value and decimals)

    // PLACE VALUE QUESTIONS
    if (module.id === 'Y2_N1_place_value') {
        const steps = params.step_sizes[level];
        const step = random(steps);
        const direction = random(params.directions[level]);
        const maxVal = params.max_value[level];
        const seqLen = params.sequence_length[level];

        let start = Math.floor(Math.random() * (maxVal / 2));
        start = Math.floor(start / step) * step;

        let sequence = [];
        for (let j = 0; j < Math.min(seqLen, 10); j++) {
            sequence.push(direction === 'forwards' ? start + (j * step) : start - (j * step));
        }

        if (type === 'drag_order') {
            const shuffled = shuffle(sequence.slice(0, 5));
            return {
                text: `Drag the numbers into the correct order (${direction}):`,
                interactive: `Draggable: ${shuffled.map(n => `[${n}]`).join(' ')}\nDrop zones: [___] [___] [___] [___] [___]`,
                answer: sequence.slice(0, 5).join(', '),
                format: 'Drag & Drop Ordering',
                interaction: 'Drag & Drop'
            };
        } else if (type === 'click_next') {
            const partial = sequence.slice(0, 4);
            const options = [sequence[4], sequence[4] + step, sequence[4] - step, sequence[4] + 2*step];
            return {
                text: `What number comes next? ${partial.join(', ')}, ...`,
                interactive: `Click the correct answer:\n${shuffle(options).map(n => `[${n}]`).join('  ')}`,
                answer: sequence[4].toString(),
                format: 'Click to Select',
                interaction: 'Click'
            };
        } else if (type === 'true_false_pattern') {
            const statement = `This sequence counts ${direction} in ${step}s: ${sequence.slice(0, 5).join(', ')}`;
            const isTrue = Math.random() > 0.3;
            const wrongStep = step + (Math.random() > 0.5 ? 1 : -1);
            return {
                text: isTrue ? statement : `This sequence counts ${direction} in ${wrongStep}s: ${sequence.slice(0, 5).join(', ')}`,
                interactive: `Click: [TRUE] or [FALSE]`,
                answer: isTrue ? 'TRUE' : 'FALSE',
                format: 'True/False',
                interaction: 'Click'
            };
        } else if (type === 'select_all_multiples') {
            const nums = Array.from({length: 10}, (_, i) => start + i * Math.floor(step/2));
            const multiples = nums.filter(n => n % step === 0);
            return {
                text: `Select ALL the multiples of ${step}:`,
                interactive: `Click all that apply:\n${nums.map(n => `[${n}]`).join(' ')}`,
                answer: multiples.join(', '),
                format: 'Select All That Apply',
                interaction: 'Multi-Select'
            };
        } else if (type === 'error_spot') {
            const withError = [...sequence.slice(0, 5)];
            const errorPos = 2 + Math.floor(Math.random() * 2);
            withError[errorPos] = withError[errorPos] + 1;
            return {
                text: `This sequence has ONE mistake. Click the wrong number:`,
                interactive: `${withError.map(n => `[${n}]`).join(' ')}`,
                answer: withError[errorPos].toString(),
                format: 'Error Identification',
                interaction: 'Click'
            };
        } else if (type === 'word_problem') {
            const context = random(contexts.objects);
            return {
                text: `Sarah ${direction === 'forwards' ? 'collects' : 'gives away'} ${step} ${context} each day. She starts with ${sequence[0]}. How many does she have after 4 days?`,
                answer: sequence[4].toString(),
                format: 'Word Problem',
                interaction: 'Type Answer'
            };
        } else {
            const display = [...sequence.slice(0, 6)];
            display[3] = '___';
            return {
                text: `Fill in the missing number: ${display.join(', ')}`,
                answer: sequence[3].toString(),
                format: 'Fill in the Blank',
                interaction: 'Type Answer'
            };
        }
    }

    // PLACE VALUE QUESTIONS
    else if (module.id === 'Y2_N1_place_value') {
        const min = params.min_number[level];
        const max = params.max_number[level];
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        const tens = Math.floor(num / 10);
        const ones = num % 10;

        if (type === 'drag_partition') {
            const tensValue = tens * 10;
            const options = [tensValue, ones, tensValue + 10, ones + 1];
            return {
                text: `Partition ${num} by dragging:`,
                interactive: `${num} = [___] + [___]\n\nDrag from: ${shuffle(options).map(n => `[${n}]`).join(' ')}`,
                answer: `${tensValue} + ${ones}`,
                format: 'Drag & Partition',
                interaction: 'Drag & Drop'
            };
        } else if (type === 'true_false') {
            const statements = [
                [`The digit ${tens} in ${num} represents ${tens * 10}`, true],
                [`${num} has ${tens} tens`, true],
                [`${num} has ${tens} ones`, false],
                [`The digit ${ones} in ${num} represents ${ones * 10}`, false]
            ];
            const [statement, isTrue] = random(statements);
            return {
                text: statement,
                interactive: `Click: [TRUE] or [FALSE]`,
                answer: isTrue ? 'TRUE' : 'FALSE',
                format: 'True/False',
                interaction: 'Click'
            };
        } else if (type === 'order_numbers') {
            const nums = [num, num + 5, num - 5, num + 10].filter(n => n >= min && n <= max).slice(0, 4);
            const shuffled = shuffle(nums);
            const sorted = [...nums].sort((a, b) => a - b);
            return {
                text: `Drag to order from smallest to largest:`,
                interactive: `Drag: ${shuffled.map(n => `[${n}]`).join(' ')}\nTo: [___] [___] [___] [___]`,
                answer: sorted.join(', '),
                format: 'Ordering',
                interaction: 'Drag & Drop'
            };
        } else if (type === 'compare_click') {
            const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
            return {
                text: `Which number is LARGER?`,
                interactive: `Click: [${num}] or [${num2}]`,
                answer: Math.max(num, num2).toString(),
                format: 'Comparison',
                interaction: 'Click'
            };
        } else if (type === 'match_representation') {
            const tensValue = tens * 10;
            return {
                text: `Match the number to its expanded form:`,
                interactive: `Drag ${num} to match:\n[${tensValue} + ${ones}]  [${tens} + ${ones}]  [${tensValue + ones + 10}]`,
                answer: `${tensValue} + ${ones}`,
                format: 'Match Representations',
                interaction: 'Drag & Drop'
            };
        } else {
            return {
                text: `What is the value of the tens digit in ${num}?`,
                interactive: `Click: [${tens}] [${tens * 10}] [${ones}] [${ones * 10}]`,
                answer: (tens * 10).toString(),
                format: 'Identify Digit Value',
                interaction: 'Click'
            };
        }
    }

    // DECIMALS QUESTIONS
    else if (module.id === 'Y5_F2_decimals') {
        const dp = params.decimal_places[level];
        const range = params.integer_range[level];
        const count = params.number_count[level];

        const numbers = [];
        for (let i = 0; i < count; i++) {
            const integer = Math.floor(Math.random() * (range[1] - range[0])) + range[0];
            const decimal = (Math.random()).toFixed(dp);
            numbers.push(parseFloat(integer + decimal.substring(1)));
        }

        if (type === 'order_drag') {
            const subset = numbers.slice(0, 4);
            const shuffled = shuffle(subset);
            const sorted = [...subset].sort((a, b) => a - b);
            return {
                text: `Drag to order from smallest to largest:`,
                interactive: `Drag: ${shuffled.map(n => `[${n}]`).join(' ')}\nTo: [___] [___] [___] [___]`,
                answer: sorted.join(', '),
                format: 'Drag & Order',
                interaction: 'Drag & Drop'
            };
        } else if (type === 'true_false_compare') {
            const [n1, n2] = numbers;
            const statements = [
                [`${n1} > ${n2}`, n1 > n2],
                [`${n1} < ${n2}`, n1 < n2],
                [`${n1} = ${n2}`, n1 === n2]
            ];
            const [statement, isTrue] = random(statements);
            return {
                text: statement,
                interactive: `Click: [TRUE] or [FALSE]`,
                answer: isTrue ? 'TRUE' : 'FALSE',
                format: 'True/False',
                interaction: 'Click'
            };
        } else if (type === 'number_line_click') {
            const [n1, n2] = numbers.slice(0, 2);
            const lower = Math.floor(Math.min(n1, n2));
            const upper = Math.ceil(Math.max(n1, n2));
            return {
                text: `Where would ${n1} appear on this number line?`,
                interactive: `${lower} ----[A]---- ${(lower + upper) / 2} ----[B]---- ${upper}\n\nClick: [A] or [B]`,
                answer: n1 < (lower + upper) / 2 ? 'A' : 'B',
                format: 'Number Line',
                interaction: 'Click'
            };
        } else if (type === 'select_all_between') {
            const [low, high] = numbers.slice(0, 2).sort((a, b) => a - b);
            const testNums = numbers.slice(2, 5);
            const between = testNums.filter(n => n > low && n < high);
            return {
                text: `Select ALL numbers between ${low} and ${high}:`,
                interactive: `Click all that apply:\n${testNums.map(n => `[${n}]`).join(' ')}`,
                answer: between.join(', '),
                format: 'Select All That Apply',
                interaction: 'Multi-Select'
            };
        } else if (type === 'rounding') {
            const n = numbers[0];
            const rounded = Math.round(n);
            return {
                text: `Round ${n} to the nearest whole number:`,
                interactive: `Click: [${rounded - 1}] [${rounded}] [${rounded + 1}]`,
                answer: rounded.toString(),
                format: 'Rounding',
                interaction: 'Click'
            };
        } else {
            const [n1, n2] = numbers;
            return {
                text: `Which is larger?`,
                interactive: `Click: [${n1}] or [${n2}]`,
                answer: Math.max(n1, n2).toString(),
                format: 'Comparison',
                interaction: 'Click'
            };
        }
    }

    return null;
}

function displayQuestions() {
    const list = document.getElementById('questionsList');
    const levelNames = { 1: 'Beginning', 2: 'Developing', 3: 'Meeting', 4: 'Exceeding' };

    // Calculate statistics
    const formats = [...new Set(generatedQuestions.map(q => q.format))];
    const interactive = generatedQuestions.filter(q => q.interaction && q.interaction !== 'Type Answer');

    document.getElementById('totalQuestions').textContent = generatedQuestions.length;
    document.getElementById('uniqueFormats').textContent = formats.length;
    document.getElementById('interactiveCount').textContent = interactive.length;
    document.getElementById('statsPanel').style.display = 'grid';

    list.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; text-align: left;">
            <strong>Generated ${generatedQuestions.length} questions for Level ${currentLevel}: ${levelNames[currentLevel]}</strong><br>
            <span style="font-size: 13px; color: #666;">${formats.length} different question types • ${interactive.length} interactive formats</span>
        </div>
    ` + generatedQuestions.map((q, idx) => `
        <div class="question-card">
            <div class="q-number">Question ${idx + 1}</div>
            <div class="q-format">${q.format}</div>
            ${q.interaction ? `<div class="q-interaction">${q.interaction}</div>` : ''}
            <div class="q-text">${q.text}</div>
            ${q.visual ? `<div class="q-visual">${q.visual}</div>` : ''}
            ${q.interactive ? `<div class="q-interactive">${q.interactive}</div>` : ''}
            ${q.hint ? `<div class="q-hint">💡 Hint: ${q.hint}</div>` : ''}
            <div class="q-answer"><strong>Answer:</strong> ${q.answer}</div>
        </div>
    `).join('');

    document.getElementById('exportSection').style.display = 'block';
}

function printQuestions() {
    const module = MODULES[currentModule];
    const levelNames = { 1: 'Beginning', 2: 'Developing', 3: 'Meeting', 4: 'Exceeding' };

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>Questions - ${module.year} ${module.strand}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                h1 { color: #667eea; }
                .question { margin: 25px 0; padding: 15px; border-left: 4px solid #667eea; background: #f9f9f9; page-break-inside: avoid; }
                .badges { margin-bottom: 10px; }
                .badge { display: inline-block; padding: 4px 10px; background: #e0e0e0; border-radius: 4px; font-size: 11px; margin-right: 5px; }
                .visual, .interactive { background: white; padding: 12px; margin: 10px 0; font-family: monospace; border: 1px solid #ddd; white-space: pre-wrap; }
                .interactive { border: 2px dashed #4caf50; background: #f1f8f4; }
                .answer { margin-top: 10px; padding: 10px; background: #e8e8e8; border-radius: 4px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>${module.year}: ${module.strand}</h1>
            <p><strong>Module:</strong> ${module.description}</p>
            <p><strong>Level:</strong> ${currentLevel} - ${levelNames[currentLevel]}</p>
            <p><strong>Questions:</strong> ${generatedQuestions.length}</p>
            <hr>
            ${generatedQuestions.map((q, idx) => `
                <div class="question">
                    <strong>Question ${idx + 1}</strong>
                    <div class="badges">
                        <span class="badge">${q.format}</span>
                        ${q.interaction ? `<span class="badge" style="background: #d4edda;">${q.interaction}</span>` : ''}
                    </div>
                    <div style="margin: 10px 0; font-size: 16px;">${q.text}</div>
                    ${q.visual ? `<div class="visual">${q.visual}</div>` : ''}
                    ${q.interactive ? `<div class="interactive">${q.interactive}</div>` : ''}
                    ${q.hint ? `<div style="margin-top: 8px; padding: 8px; background: #fff9e6; border-left: 3px solid #ffc107; font-style: italic; font-size: 13px;">💡 ${q.hint}</div>` : ''}
                    <div class="answer"><strong>Answer:</strong> ${q.answer}</div>
                </div>
            `).join('')}
            <div class="no-print" style="margin-top: 30px;">
                <button onclick="window.print()" style="padding: 10px 20px; font-size: 14px; cursor: pointer;">Print</button>
                <button onclick="window.close()" style="padding: 10px 20px; font-size: 14px; cursor: pointer; margin-left: 10px;">Close</button>
            </div>
        </body>
        </html>
    `);
}

function exportJSON() {
    const module = MODULES[currentModule];
    const data = {
        module: {
            id: module.id,
            year: module.year,
            strand: module.strand,
            substrand: module.substrand,
            description: module.description
        },
        level: currentLevel,
        question_count: generatedQuestions.length,
        questions: generatedQuestions,
        statistics: {
            total_questions: generatedQuestions.length,
            unique_formats: [...new Set(generatedQuestions.map(q => q.format))].length,
            interactive_count: generatedQuestions.filter(q => q.interaction && q.interaction !== 'Type Answer').length,
            format_breakdown: generatedQuestions.reduce((acc, q) => {
                acc[q.format] = (acc[q.format] || 0) + 1;
                return acc;
            }, {})
        },
        generated_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questions_${module.id}_level${currentLevel}_${Date.now()}.json`;
    a.click();
}

// Make functions globally accessible for HTML onclick handlers
window.selectModule = selectModule;
window.printQuestions = printQuestions;
window.exportJSON = exportJSON;

init();
