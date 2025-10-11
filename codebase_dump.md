# 🧾 Codebase Export
_Generated on 11/10/2025, 07:15:33_

**Total files included:** 40

---
### `.claude\settings.local.json`
**Type:** json

```json
{
  "permissions": {
    "allow": [
      "Bash(mkdir:*)"
    ],
    "deny": [],
    "ask": []
  }
}

```

---
### `docs\interactive_student.html`
**Type:** html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Maths Practice</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            width: 100%;
            max-width: 900px;
        }

        .setup-screen, .practice-screen, .results-screen {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .setup-screen h1 {
            color: #667eea;
            font-size: 36px;
            margin-bottom: 10px;
            text-align: center;
        }

        .setup-screen p {
            color: #666;
            text-align: center;
            margin-bottom: 30px;
        }

        .setup-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .setup-card {
            background: #f8f9ff;
            border: 3px solid #e0e0e0;
            border-radius: 15px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }

        .setup-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .setup-card.selected {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .setup-card h3 {
            font-size: 18px;
            margin-bottom: 5px;
        }

        .setup-card p {
            font-size: 14px;
            opacity: 0.8;
        }

        .level-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        .level-card {
            padding: 15px;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
            font-weight: 600;
            border: 3px solid transparent;
            transition: all 0.3s;
        }

        .level-card.level-1 { background: #d4edda; color: #155724; }
        .level-card.level-2 { background: #d1ecf1; color: #0c5460; }
        .level-card.level-3 { background: #e2d9f3; color: #4a148c; }
        .level-card.level-4 { background: #ffe5cc; color: #833c0c; }

        .level-card:hover {
            transform: scale(1.05);
        }

        .level-card.selected {
            border-color: #333;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .question-count {
            text-align: center;
            margin-bottom: 30px;
        }

        .question-count label {
            display: block;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }

        .question-count input {
            width: 100px;
            padding: 10px;
            border: 2px solid #667eea;
            border-radius: 8px;
            font-size: 18px;
            text-align: center;
            font-weight: 600;
        }

        .start-btn {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }

        .start-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .start-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Practice Screen */
        .practice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }

        .progress-info {
            font-size: 18px;
            font-weight: 600;
            color: #667eea;
        }

        .score-display {
            display: flex;
            gap: 20px;
        }

        .score-item {
            text-align: center;
        }

        .score-value {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
        }

        .score-label {
            font-size: 12px;
            color: #666;
        }

        .progress-bar {
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 30px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #28a745, #20c997);
            transition: width 0.5s ease;
        }

        .question-card {
            background: #f8f9ff;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
        }

        .question-number {
            color: #667eea;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .question-text {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            line-height: 1.4;
        }

        .answer-options {
            display: grid;
            gap: 12px;
        }

        .answer-btn {
            padding: 18px 24px;
            background: white;
            border: 3px solid #e0e0e0;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
        }

        .answer-btn:hover:not(:disabled) {
            border-color: #667eea;
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .answer-btn.selected {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .answer-btn.correct {
            background: #28a745;
            color: white;
            border-color: #28a745;
        }

        .answer-btn.incorrect {
            background: #dc3545;
            color: white;
            border-color: #dc3545;
        }

        .answer-btn:disabled {
            cursor: not-allowed;
        }

        .text-input {
            width: 100%;
            padding: 15px;
            font-size: 20px;
            border: 3px solid #667eea;
            border-radius: 12px;
            text-align: center;
            font-weight: 600;
        }

        .submit-btn {
            width: 100%;
            padding: 15px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
            background: #5568d3;
            transform: translateY(-2px);
        }

        .submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .feedback {
            margin-top: 20px;
            padding: 20px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }

        .feedback.correct {
            background: #d4edda;
            color: #155724;
            border: 2px solid #28a745;
        }

        .feedback.incorrect {
            background: #f8d7da;
            color: #721c24;
            border: 2px solid #dc3545;
        }

        .next-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s;
        }

        .next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
        }

        /* Draggable items */
        .drag-area {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            margin: 15px 0;
            min-height: 80px;
        }

        .draggable-item {
            padding: 12px 20px;
            background: #667eea;
            color: white;
            border-radius: 8px;
            cursor: move;
            font-size: 18px;
            font-weight: 600;
            user-select: none;
            transition: all 0.2s;
        }

        .draggable-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .draggable-item.dragging {
            opacity: 0.5;
        }

        .drop-zone {
            padding: 15px 25px;
            background: #f8f9ff;
            border: 3px dashed #667eea;
            border-radius: 8px;
            min-width: 80px;
            min-height: 55px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
            color: #999;
            margin: 5px;
            transition: all 0.2s;
        }

        .drop-zone.drag-over {
            background: #e3f2fd;
            border-color: #2196f3;
        }

        .drop-zone.filled {
            background: #667eea;
            color: white;
            border-style: solid;
        }

        /* Results Screen */
        .results-screen h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 30px;
            font-size: 36px;
        }

        .results-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .result-card {
            background: #f8f9ff;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
        }

        .result-value {
            font-size: 48px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }

        .result-label {
            color: #666;
            font-size: 16px;
        }

        .performance-message {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin-bottom: 30px;
        }

        .performance-message h2 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .performance-message p {
            font-size: 18px;
            opacity: 0.9;
        }

        .action-btns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .action-btn {
            padding: 15px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.3s;
        }

        .action-btn.primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .action-btn.secondary {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .hidden {
            display: none;
        }

        .emoji {
            font-size: 64px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Setup Screen -->
        <div class="setup-screen" id="setupScreen">
            <h1>🎓 Maths Practice</h1>
            <p>Choose your topic and difficulty to start practicing!</p>

            <h3 style="margin-bottom: 15px; color: #333;">Choose a Topic:</h3>
            <div class="setup-grid" id="topicGrid"></div>

            <h3 style="margin-bottom: 15px; color: #333;">Choose Difficulty:</h3>
            <div class="level-cards" id="levelCards"></div>

            <div class="question-count">
                <label>Number of Questions:</label>
                <input type="number" id="questionCountInput" min="5" max="20" value="10">
            </div>

            <button class="start-btn" id="startBtn">Start Practice</button>
        </div>

        <!-- Practice Screen -->
        <div class="practice-screen hidden" id="practiceScreen">
            <div class="practice-header">
                <div class="progress-info">
                    Question <span id="currentQ">1</span> of <span id="totalQ">10</span>
                </div>
                <div class="score-display">
                    <div class="score-item">
                        <div class="score-value" id="correctCount">0</div>
                        <div class="score-label">Correct</div>
                    </div>
                    <div class="score-item">
                        <div class="score-value" style="color: #dc3545;" id="incorrectCount">0</div>
                        <div class="score-label">Incorrect</div>
                    </div>
                </div>
            </div>

            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>

            <div class="question-card">
                <div class="question-number" id="questionType">Multiple Choice</div>
                <div class="question-text" id="questionText">Loading question...</div>
                <div id="answerArea"></div>
                <div id="feedbackArea"></div>
            </div>
        </div>

        <!-- Results Screen -->
        <div class="results-screen hidden" id="resultsScreen">
            <div class="emoji" style="text-align: center;" id="resultsEmoji">🎉</div>
            <h1>Practice Complete!</h1>
            
            <div class="results-summary">
                <div class="result-card">
                    <div class="result-value" id="finalScore">0</div>
                    <div class="result-label">Score</div>
                </div>
                <div class="result-card">
                    <div class="result-value" id="finalCorrect">0</div>
                    <div class="result-label">Correct</div>
                </div>
                <div class="result-card">
                    <div class="result-value" id="finalIncorrect">0</div>
                    <div class="result-label">Incorrect</div>
                </div>
                <div class="result-card">
                    <div class="result-value" id="finalPercentage">0%</div>
                    <div class="result-label">Percentage</div>
                </div>
            </div>

            <div class="performance-message" id="performanceMessage">
                <h2 id="performanceTitle">Well done!</h2>
                <p id="performanceText">You're making great progress!</p>
            </div>

            <div class="action-btns">
                <button class="action-btn primary" onclick="restartPractice()">Practice Again</button>
                <button class="action-btn secondary" onclick="changeTopic()">Change Topic</button>
            </div>
        </div>
    </div>

    <script>
        const MODULES = {
            'counting': {
                id: 'counting',
                name: 'Counting',
                description: 'Number sequences and patterns',
                params: {
                    max_value: { 1: 30, 2: 50, 3: 100, 4: 200 },
                    step_sizes: { 1: [1, 2, 5, 10], 2: [1, 2, 5, 10], 3: [1, 2, 5, 10], 4: [1, 2, 3, 5, 10] }
                }
            },
            'bonds': {
                id: 'bonds',
                name: 'Number Bonds',
                description: 'Addition and subtraction facts',
                params: {
                    total_value: { 1: [5, 10], 2: [10], 3: [10, 20], 4: [20] }
                }
            },
            'multiply': {
                id: 'multiply',
                name: 'Multiplication',
                description: 'Times tables practice',
                params: {
                    times_tables: { 1: [2, 5, 10], 2: [2, 3, 4, 5], 3: [3, 4, 8], 4: [6, 7, 8, 9] },
                    max_multiplier: { 1: 5, 2: 10, 3: 12, 4: 12 }
                }
            },
            'fractions': {
                id: 'fractions',
                name: 'Fractions',
                description: 'Equivalent fractions',
                params: {
                    denominators: { 1: [2, 4], 2: [2, 3, 4, 5], 3: [2, 3, 4, 5, 6, 8], 4: [2, 3, 4, 5, 6, 7, 8, 9] }
                }
            }
        };

        let selectedModule = null;
        let selectedLevel = 3;
        let questionCount = 10;
        let questions = [];
        let currentQuestionIndex = 0;
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let currentAnswer = null;

        function init() {
            renderTopics();
            renderLevels();
            
            document.getElementById('startBtn').addEventListener('click', startPractice);
        }

        function renderTopics() {
            const grid = document.getElementById('topicGrid');
            grid.innerHTML = Object.values(MODULES).map(m => `
                <div class="setup-card" onclick="selectTopic('${m.id}')">
                    <h3>${m.name}</h3>
                    <p>${m.description}</p>
                </div>
            `).join('');
        }

        function renderLevels() {
            const grid = document.getElementById('levelCards');
            const levels = [
                { num: 1, name: 'Beginning' },
                { num: 2, name: 'Developing' },
                { num: 3, name: 'Meeting' },
                { num: 4, name: 'Exceeding' }
            ];
            
            grid.innerHTML = levels.map(l => `
                <div class="level-card level-${l.num} ${l.num === 3 ? 'selected' : ''}" onclick="selectLevel(${l.num})">
                    <div>Level ${l.num}</div>
                    <div style="font-size: 12px; margin-top: 5px;">${l.name}</div>
                </div>
            `).join('');
        }

        function selectTopic(moduleId) {
            selectedModule = moduleId;
            document.querySelectorAll('.setup-card').forEach(card => {
                card.classList.remove('selected');
            });
            event.target.closest('.setup-card').classList.add('selected');
        }

        function selectLevel(level) {
            selectedLevel = level;
            document.querySelectorAll('.level-card').forEach(card => {
                card.classList.remove('selected');
            });
            event.target.classList.add('selected');
        }

        function startPractice() {
            if (!selectedModule) {
                alert('Please select a topic!');
                return;
            }

            questionCount = parseInt(document.getElementById('questionCountInput').value);
            generateQuestions();
            
            document.getElementById('setupScreen').classList.add('hidden');
            document.getElementById('practiceScreen').classList.remove('hidden');
            
            currentQuestionIndex = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            
            updateProgress();
            showQuestion();
        }

        function generateQuestions() {
            questions = [];
            const module = MODULES[selectedModule];
            
            for (let i = 0; i < questionCount; i++) {
                const question = generateQuestion(module, selectedLevel);
                if (question) questions.push(question);
            }
        }

        function generateQuestion(module, level) {
            const params = module.params;

            if (module.id === 'counting') {
                const steps = params.step_sizes[level];
                const step = steps[Math.floor(Math.random() * steps.length)];
                const maxVal = params.max_value[level];
                const direction = Math.random() > 0.5 ? 'forwards' : 'backwards';
                
                let start = Math.floor(Math.random() * (maxVal / 2));
                start = Math.floor(start / step) * step;
                
                const sequence = [];
                for (let j = 0; j < 6; j++) {
                    sequence.push(direction === 'forwards' ? start + (j * step) : start - (j * step));
                }

                const types = ['fill_blank', 'multiple_choice', 'next_number'];
                const type = types[Math.floor(Math.random() * types.length)];

                if (type === 'multiple_choice') {
                    const options = [
                        sequence[4],
                        sequence[4] + step,
                        sequence[4] - step,
                        sequence[4] + 2 * step
                    ].sort(() => Math.random() - 0.5);

                    return {
                        text: `What comes next? ${sequence.slice(0, 4).join(', ')}, ...`,
                        type: 'multiple_choice',
                        options: options,
                        answer: sequence[4].toString()
                    };
                } else {
                    return {
                        text: `Fill in the missing number: ${sequence[0]}, ${sequence[1]}, ___, ${sequence[3]}`,
                        type: 'text_input',
                        answer: sequence[2].toString()
                    };
                }
            }

            else if (module.id === 'bonds') {
                const totals = params.total_value[level];
                const total = totals[Math.floor(Math.random() * totals.length)];
                const part1 = Math.floor(Math.random() * (total + 1));
                const part2 = total - part1;

                const types = ['addition', 'subtraction', 'multiple_choice'];
                const type = types[Math.floor(Math.random() * types.length)];

                if (type === 'multiple_choice') {
                    const options = [part2, part2 + 1, part2 - 1, total - part1 - 2].filter(n => n >= 0);
                    while (options.length < 4) options.push(Math.floor(Math.random() * total));
                    
                    return {
                        text: `${part1} + ? = ${total}`,
                        type: 'multiple_choice',
                        options: [...new Set(options)].sort(() => Math.random() - 0.5).slice(0, 4),
                        answer: part2.toString()
                    };
                } else if (type === 'subtraction') {
                    return {
                        text: `${total} - ${part1} = ?`,
                        type: 'text_input',
                        answer: part2.toString()
                    };
                } else {
                    return {
                        text: `${part1} + ? = ${total}`,
                        type: 'text_input',
                        answer: part2.toString()
                    };
                }
            }

            else if (module.id === 'multiply') {
                const tables = params.times_tables[level];
                const table = tables[Math.floor(Math.random() * tables.length)];
                const multiplier = Math.floor(Math.random() * params.max_multiplier[level]) + 1;
                const product = table * multiplier;

                const types = ['standard', 'multiple_choice', 'division'];
                const type = types[Math.floor(Math.random() * types.length)];

                if (type === 'multiple_choice') {
                    const options = [
                        product,
                        product + table,
                        product - table,
                        table + multiplier
                    ].sort(() => Math.random() - 0.5);

                    return {
                        text: `${table} × ${multiplier} = ?`,
                        type: 'multiple_choice',
                        options: options,
                        answer: product.toString()
                    };
                } else if (type === 'division') {
                    return {
                        text: `${product} ÷ ${table} = ?`,
                        type: 'text_input',
                        answer: multiplier.toString()
                    };
                } else {
                    return {
                        text: `${table} × ${multiplier} = ?`,
                        type: 'text_input',
                        answer: product.toString()
                    };
                }
            }

            else if (module.id === 'fractions') {
                const denoms = params.denominators[level];
                const denom1 = denoms[Math.floor(Math.random() * denoms.length)];
                const multiplier = Math.floor(Math.random() * 3) + 2;
                const denom2 = denom1 * multiplier;
                const num1 = Math.floor(Math.random() * denom1) + 1;
                const num2 = num1 * multiplier;

                const types = ['fill_blank', 'multiple_choice'];
                const type = types[Math.floor(Math.random() * types.length)];

                if (type === 'multiple_choice') {
                    const options = [
                        `${num2}/${denom2}`,
                        `${num2 + 1}/${denom2}`,
                        `${num2}/${denom2 + 1}`,
                        `${num1}/${denom2}`
                    ].sort(() => Math.random() - 0.5);

                    return {
                        text: `Which fraction equals ${num1}/${denom1}?`,
                        type: 'multiple_choice',
                        options: options,
                        answer: `${num2}/${denom2}`
                    };
                } else {
                    return {
                        text: `${num1}/${denom1} = ?/${denom2}`,
                        type: 'text_input',
                        answer: num2.toString(),
                        hint: `Type just the numerator (top number)`
                    };
                }
            }

            return null;
        }

        function showQuestion() {
            const question = questions[currentQuestionIndex];
            currentAnswer = null;
            
            document.getElementById('questionType').textContent = question.type === 'multiple_choice' ? 'Multiple Choice' : 'Type Your Answer';
            document.getElementById('questionText').textContent = question.text;
            document.getElementById('feedbackArea').innerHTML = '';

            const answerArea = document.getElementById('answerArea');
            
            if (question.type === 'multiple_choice') {
                answerArea.innerHTML = `
                    <div class="answer-options">
                        ${question.options.map(opt => `
                            <button class="answer-btn" onclick="selectAnswer('${opt}')">${opt}</button>
                        `).join('')}
                    </div>
                `;
            } else {
                answerArea.innerHTML = `
                    <input type="text" class="text-input" id="textAnswer" placeholder="Type your answer here">
                    <button class="submit-btn" onclick="submitTextAnswer()">Submit Answer</button>
                    ${question.hint ? `<p style="margin-top: 10px; color: #666; font-style: italic;">💡 ${question.hint}</p>` : ''}
                `;
                
                document.getElementById('textAnswer').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') submitTextAnswer();
                });
            }
        }

        function selectAnswer(answer) {
            currentAnswer = answer;
            checkAnswer();
        }

        function submitTextAnswer() {
            const input = document.getElementById('textAnswer');
            currentAnswer = input.value.trim();
            
            if (!currentAnswer) {
                alert('Please enter an answer!');
                return;
            }
            
            input.disabled = true;
            document.querySelector('.submit-btn').disabled = true;
            checkAnswer();
        }

        function checkAnswer() {
            const question = questions[currentQuestionIndex];
            const isCorrect = currentAnswer === question.answer;
            
            if (isCorrect) {
                correctAnswers++;
                showFeedback(true, question.answer);
            } else {
                incorrectAnswers++;
                showFeedback(false, question.answer);
            }

            updateProgress();
            
            // Disable all answer buttons
            document.querySelectorAll('.answer-btn').forEach(btn => {
                btn.disabled = true;
                if (btn.textContent === question.answer) {
                    btn.classList.add('correct');
                } else if (btn.textContent === currentAnswer) {
                    btn.classList.add('incorrect');
                }
            });
        }

        function showFeedback(isCorrect, correctAnswer) {
            const feedbackArea = document.getElementById('feedbackArea');
            
            if (isCorrect) {
                feedbackArea.innerHTML = `
                    <div class="feedback correct">
                        ✓ Correct! Well done!
                    </div>
                    <button class="next-btn" onclick="nextQuestion()">Next Question →</button>
                `;
            } else {
                feedbackArea.innerHTML = `
                    <div class="feedback incorrect">
                        ✗ Not quite. The correct answer is: ${correctAnswer}
                    </div>
                    <button class="next-btn" onclick="nextQuestion()">Next Question →</button>
                `;
            }
        }

        function nextQuestion() {
            currentQuestionIndex++;
            
            if (currentQuestionIndex >= questions.length) {
                showResults();
            } else {
                showQuestion();
            }
        }

        function updateProgress() {
            document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
            document.getElementById('totalQ').textContent = questions.length;
            document.getElementById('correctCount').textContent = correctAnswers;
            document.getElementById('incorrectCount').textContent = incorrectAnswers;
            
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function showResults() {
            document.getElementById('practiceScreen').classList.add('hidden');
            document.getElementById('resultsScreen').classList.remove('hidden');
            
            const percentage = Math.round((correctAnswers / questions.length) * 100);
            
            document.getElementById('finalScore').textContent = `${correctAnswers}/${questions.length}`;
            document.getElementById('finalCorrect').textContent = correctAnswers;
            document.getElementById('finalIncorrect').textContent = incorrectAnswers;
            document.getElementById('finalPercentage').textContent = percentage + '%';
            
            let emoji, title, text;
            
            if (percentage >= 90) {
                emoji = '🌟';
                title = 'Outstanding!';
                text = 'You\'re a maths superstar! Keep up the excellent work!';
            } else if (percentage >= 70) {
                emoji = '🎉';
                title = 'Great Job!';
                text = 'You\'re doing really well! Keep practicing!';
            } else if (percentage >= 50) {
                emoji = '👍';
                title = 'Good Effort!';
                text = 'You\'re making progress! Try again to improve your score!';
            } else {
                emoji = '💪';
                title = 'Keep Trying!';
                text = 'Practice makes perfect! Have another go!';
            }
            
            document.getElementById('resultsEmoji').textContent = emoji;
            document.getElementById('performanceTitle').textContent = title;
            document.getElementById('performanceText').textContent = text;
        }

        function restartPractice() {
            document.getElementById('resultsScreen').classList.add('hidden');
            document.getElementById('practiceScreen').classList.remove('hidden');
            
            currentQuestionIndex = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            
            generateQuestions();
            updateProgress();
            showQuestion();
        }

        function changeTopic() {
            document.getElementById('resultsScreen').classList.add('hidden');
            document.getElementById('setupScreen').classList.remove('hidden');
            
            selectedModule = null;
            document.querySelectorAll('.setup-card').forEach(card => {
                card.classList.remove('selected');
            });
        }

        init();
    </script>
</body>
</html>
```

---
### `docs\mvp_system.html`
**Type:** html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curriculum Parameter System MVP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .header {
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .header h1 {
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .header p {
            color: #666;
        }
        
        .main-grid {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
        }
        
        @media (max-width: 968px) {
            .main-grid {
                grid-template-columns: 1fr;
            }
        }
        
        .panel {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .panel h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 20px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        
        .module-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .module-btn {
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            background: white;
            cursor: pointer;
            text-align: left;
            transition: all 0.3s;
        }
        
        .module-btn:hover {
            border-color: #667eea;
            background: #f8f9ff;
        }
        
        .module-btn.active {
            border-color: #667eea;
            background: #667eea;
            color: white;
        }
        
        .module-btn .year {
            font-size: 11px;
            font-weight: bold;
            opacity: 0.8;
        }
        
        .module-btn .title {
            font-size: 13px;
            font-weight: 600;
            margin: 5px 0;
        }
        
        .level-selector {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
        }
        
        .level-selector h3 {
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        .level-btns {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .level-btn {
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .level-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .level-btn.active {
            border-width: 3px;
        }
        
        .level-btn.level-1.active { background: #d4edda; border-color: #28a745; color: #155724; }
        .level-btn.level-2.active { background: #d1ecf1; border-color: #17a2b8; color: #0c5460; }
        .level-btn.level-3.active { background: #e2d9f3; border-color: #6f42c1; color: #4a148c; }
        .level-btn.level-4.active { background: #ffe5cc; border-color: #fd7e14; color: #833c0c; }
        
        .right-panel {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .module-info {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
        }
        
        .module-info h2 {
            color: white;
            border: none;
            margin-bottom: 10px;
        }
        
        .module-info .description {
            opacity: 0.95;
            line-height: 1.6;
        }
        
        .params-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .param-card {
            background: #f8f9ff;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .param-card .param-name {
            font-size: 12px;
            color: #666;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        
        .param-card .param-value {
            font-size: 20px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .param-card .param-progression {
            font-size: 11px;
            color: #999;
            line-height: 1.4;
        }
        
        .generate-section {
            text-align: center;
        }

        .question-count-control {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .question-count-control label {
            font-weight: 600;
            color: #333;
        }

        .question-count-control input {
            width: 80px;
            padding: 8px 12px;
            border: 2px solid #667eea;
            border-radius: 8px;
            font-size: 16px;
            text-align: center;
            font-weight: 600;
        }
        
        .generate-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 18px 40px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .questions-list {
            margin-top: 25px;
        }
        
        .question-card {
            background: white;
            border: 2px solid #e0e0e0;
            border-left: 5px solid #667eea;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
        }
        
        .question-card .q-number {
            font-size: 12px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
        }
        
        .question-card .q-format {
            display: inline-block;
            font-size: 10px;
            padding: 4px 8px;
            background: #e0e0e0;
            border-radius: 4px;
            margin-bottom: 10px;
            font-weight: 600;
            color: #555;
        }

        .question-card .q-interaction {
            display: inline-block;
            font-size: 10px;
            padding: 4px 8px;
            background: #d4edda;
            border-radius: 4px;
            margin-left: 5px;
            margin-bottom: 10px;
            font-weight: 600;
            color: #155724;
        }
        
        .question-card .q-text {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 12px;
            line-height: 1.5;
        }
        
        .question-card .q-visual {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            font-family: monospace;
            border: 1px solid #e0e0e0;
            white-space: pre-wrap;
        }

        .question-card .q-interactive {
            background: #e8f5e9;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            border: 2px dashed #4caf50;
        }

        .question-card .q-draggable {
            display: inline-block;
            padding: 8px 16px;
            background: #667eea;
            color: white;
            border-radius: 6px;
            margin: 5px;
            cursor: pointer;
            font-weight: 600;
        }

        .question-card .q-dropzone {
            display: inline-block;
            padding: 8px 16px;
            background: white;
            border: 2px dashed #999;
            border-radius: 6px;
            margin: 5px;
            min-width: 60px;
            text-align: center;
        }

        .question-card .q-clickable {
            display: inline-block;
            padding: 10px 20px;
            background: #f5f5f5;
            border: 2px solid #ddd;
            border-radius: 8px;
            margin: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .question-card .q-clickable:hover {
            background: #e3f2fd;
            border-color: #2196f3;
        }
        
        .question-card .q-options {
            margin: 15px 0;
        }
        
        .question-card .q-option {
            padding: 10px 15px;
            font-size: 15px;
            background: #f8f9fa;
            border-left: 3px solid #667eea;
            margin: 8px 0;
            border-radius: 4px;
        }
        
        .question-card .q-answer {
            font-size: 14px;
            color: #666;
            padding: 10px;
            background: #f0f0f0;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        .question-card .q-answer strong {
            color: #667eea;
        }
        
        .question-card .q-hint {
            font-size: 12px;
            color: #888;
            font-style: italic;
            margin-top: 8px;
            padding: 8px;
            background: #fff9e6;
            border-left: 3px solid #ffc107;
            border-radius: 4px;
        }
        
        .export-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
        }
        
        .export-btn {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
            padding: 12px 30px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin: 0 5px;
            transition: all 0.3s;
        }
        
        .export-btn:hover {
            background: #667eea;
            color: white;
        }
        
        .info-badge {
            display: inline-block;
            padding: 8px 15px;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            font-size: 13px;
            margin-top: 10px;
        }

        .variety-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid #2196f3;
        }

        .variety-info strong {
            color: #1976d2;
        }

        .stats-panel {
            background: #f8f9ff;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }

        .stat-item {
            text-align: center;
            padding: 10px;
        }

        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }

        .stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Curriculum Parameter System - MVP</h1>
            <p>Generate differentiated questions with multiple digital-ready formats at 4 difficulty levels</p>
        </div>
        
        <div class="main-grid">
            <!-- Left Sidebar -->
            <div class="panel">
                <h2>Select Module</h2>
                <div class="module-list" id="moduleList"></div>
                
                <div class="level-selector">
                    <h3>Difficulty Level</h3>
                    <div class="level-btns">
                        <button class="level-btn level-1" data-level="1">Level 1: Beginning</button>
                        <button class="level-btn level-2" data-level="2">Level 2: Developing</button>
                        <button class="level-btn level-3 active" data-level="3">Level 3: Meeting</button>
                        <button class="level-btn level-4" data-level="4">Level 4: Exceeding</button>
                    </div>
                </div>
            </div>
            
            <!-- Right Panel -->
            <div class="right-panel">
                <div class="module-info" id="moduleInfo">
                    <h2 id="moduleTitle">Select a module to begin</h2>
                    <div class="description" id="moduleDesc"></div>
                    <div class="info-badge" id="moduleBadge"></div>
                </div>
                
                <div class="panel">
                    <h2>Parameters for Current Level</h2>
                    <div class="params-grid" id="paramsGrid"></div>
                </div>
                
                <div class="panel">
                    <h2>Generate Questions</h2>
                    <div class="generate-section">
                        <div class="variety-info">
                            <strong>🎮 Digital-Ready Formats:</strong> Questions include interactive formats like drag-and-drop, clickable options, true/false, matching, ordering, and more - perfect for online learning platforms.
                        </div>
                        
                        <div class="question-count-control">
                            <label for="questionCount">Number of Questions:</label>
                            <input type="number" id="questionCount" min="1" max="50" value="10">
                        </div>

                        <button class="generate-btn" id="generateBtn">
                            <span>⚡</span>
                            <span>Generate Questions</span>
                        </button>

                        <div class="stats-panel" id="statsPanel" style="display: none;">
                            <div class="stat-item">
                                <div class="stat-value" id="totalQuestions">0</div>
                                <div class="stat-label">Total Questions</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="uniqueFormats">0</div>
                                <div class="stat-label">Question Types</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="interactiveCount">0</div>
                                <div class="stat-label">Interactive</div>
                            </div>
                        </div>

                        <div class="questions-list" id="questionsList"></div>
                        <div class="export-section" id="exportSection" style="display: none;">
                            <button class="export-btn" onclick="printQuestions()">🖨️ Print Questions</button>
                            <button class="export-btn" onclick="exportJSON()">💾 Export as JSON</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // MODULE DATABASE
        const MODULES = {
            'Y1_N1_counting': {
                id: 'Y1_N1_counting',
                year: 'Year 1',
                strand: 'Number and Place Value',
                substrand: 'Counting (in multiples)',
                ref: 'N1',
                description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
                parameters: {
                    min_value: { 1: 0, 2: 0, 3: 0, 4: 0 },
                    max_value: { 1: 30, 2: 50, 3: 100, 4: 200 },
                    step_sizes: { 1: [1, 2, 5, 10], 2: [1, 2, 5, 10], 3: [1, 2, 5, 10], 4: [1, 2, 3, 5, 10] },
                    sequence_length: { 1: 5, 2: 10, 3: 15, 4: 20 },
                    directions: { 1: ['forwards'], 2: ['forwards', 'backwards'], 3: ['forwards', 'backwards'], 4: ['forwards', 'backwards'] },
                    missing_numbers: { 1: 0, 2: 1, 3: 2, 4: 3 }
                }
            },
            'Y1_C1_bonds': {
                id: 'Y1_C1_bonds',
                year: 'Year 1',
                strand: 'Calculations',
                substrand: 'Add/subtract mentally',
                ref: 'C1',
                description: 'Represent and use number bonds and related subtraction facts within 20',
                parameters: {
                    total_value: { 1: [5, 10], 2: [10], 3: [10, 20], 4: [20] },
                    missing_part: { 1: 'second', 2: 'either', 3: 'either', 4: 'any' },
                    include_subtraction: { 1: false, 2: true, 3: true, 4: true },
                    visual_aids: { 1: 'always', 2: 'often', 3: 'sometimes', 4: 'rarely' },
                    time_limit: { 1: 15, 2: 10, 3: 5, 4: 3 },
                    questions_per_session: { 1: 5, 2: 8, 3: 10, 4: 15 }
                }
            },
            'Y2_N1_place_value': {
                id: 'Y2_N1_place_value',
                year: 'Year 2',
                strand: 'Number and Place Value',
                substrand: 'Place value',
                ref: 'N1',
                description: 'Recognise the place value of each digit in a two-digit number (tens, ones)',
                parameters: {
                    min_number: { 1: 10, 2: 10, 3: 10, 4: 10 },
                    max_number: { 1: 50, 2: 75, 3: 99, 4: 999 },
                    include_zero_placeholder: { 1: false, 2: true, 3: true, 4: true }
                }
            },
            'Y3_C2_multiply': {
                id: 'Y3_C2_multiply',
                year: 'Year 3',
                strand: 'Calculations',
                substrand: 'Recall multiplication facts',
                ref: 'C2',
                description: 'Recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables',
                parameters: {
                    times_tables: { 1: [2, 5, 10], 2: [2, 3, 4, 5, 10], 3: [3, 4, 8], 4: [3, 4, 6, 7, 8, 9] },
                    max_multiplier: { 1: 5, 2: 10, 3: 12, 4: 12 },
                    include_division: { 1: false, 2: true, 3: true, 4: true },
                    time_limit: { 1: 8, 2: 5, 3: 3, 4: 2 },
                    accuracy_target: { 1: 0.70, 2: 0.80, 3: 0.90, 4: 0.95 }
                }
            },
            'Y4_F1_fractions': {
                id: 'Y4_F1_fractions',
                year: 'Year 4',
                strand: 'Fractions, Decimals and Percentages',
                substrand: 'Equivalent fractions',
                ref: 'F1',
                description: 'Recognise and show, using diagrams, families of common equivalent fractions',
                parameters: {
                    denominators: { 1: [2, 4, 10], 2: [2, 3, 4, 5, 10], 3: [2, 3, 4, 5, 6, 8, 10, 12], 4: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12] },
                    equivalences_to_find: { 1: 2, 2: 3, 3: 4, 4: 5 },
                    visual_support: { 1: 'always', 2: 'often', 3: 'sometimes', 4: 'rarely' },
                    simplification_required: { 1: false, 2: false, 3: true, 4: true }
                }
            },
            'Y5_F2_decimals': {
                id: 'Y5_F2_decimals',
                year: 'Year 5',
                strand: 'Fractions, Decimals and Percentages',
                substrand: 'Decimal place value',
                ref: 'F2',
                description: 'Read, write, order and compare numbers with up to three decimal places',
                parameters: {
                    decimal_places: { 1: 1, 2: 2, 3: 3, 4: 3 },
                    integer_range: { 1: [0, 10], 2: [0, 100], 3: [0, 1000], 4: [0, 10000] },
                    number_count: { 1: 2, 2: 3, 3: 4, 4: 5 },
                    include_trailing_zeros: { 1: false, 2: true, 3: true, 4: true }
                }
            }
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
            
            // Define question types for each module with more variety
            const questionTypes = {
                'Y1_N1_counting': [
                    'sequence_fill', 'drag_order', 'click_next', 'true_false_pattern', 
                    'multiple_choice_rule', 'word_problem', 'error_spot', 'matching_pairs',
                    'select_all_multiples', 'slider_position'
                ],
                'Y1_C1_bonds': [
                    'fill_blank', 'drag_match', 'fact_family_complete', 'true_false',
                    'multiple_choice', 'word_problem', 'visual_click', 'part_whole_drag',
                    'balance_equation', 'quick_fire'
                ],
                'Y2_N1_place_value': [
                    'identify_digit', 'drag_partition', 'multiple_choice', 'true_false',
                    'order_numbers', 'expanded_form', 'compare_click', 'error_spot',
                    'match_representation', 'word_form'
                ],
                'Y3_C2_multiply': [
                    'standard_equation', 'multiple_choice', 'drag_match_division', 'fact_family',
                    'word_problem', 'true_false', 'missing_factor', 'array_click',
                    'quick_fire_timed', 'error_analysis'
                ],
                'Y4_F1_fractions': [
                    'fill_equivalent', 'drag_match', 'multiple_choice', 'true_false_equiv',
                    'visual_click_parts', 'simplify', 'select_all_equivalent', 'ordering',
                    'word_problem', 'error_spot'
                ],
                'Y5_F2_decimals': [
                    'order_drag', 'multiple_choice', 'true_false_compare', 'fill_blank',
                    'number_line_click', 'word_problem', 'place_value_chart', 'rounding',
                    'select_all_between', 'error_analysis'
                ]
            };

            const types = questionTypes[module.id] || ['standard'];
            const type = random(types);
            
            return generateSpecificQuestion(module, level, type, params);
        }

        function generateSpecificQuestion(module, level, type, params) {
            
            // COUNTING QUESTIONS
            if (module.id === 'Y1_N1_counting') {
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
            
            // NUMBER BONDS QUESTIONS
            else if (module.id === 'Y1_C1_bonds') {
                const totals = params.total_value[level];
                const total = random(totals);
                const part1 = Math.floor(Math.random() * (total + 1));
                const part2 = total - part1;

                if (type === 'drag_match') {
                    const pairs = [[part1, part2], [part2, part1], [total - part1, part1], [total - part2, part2]];
                    const shuffledPairs = shuffle(pairs.slice(0, 3));
                    return {
                        text: `Match the pairs that make ${total}:`,
                        interactive: `Drag to match:\nLeft: [${part1}] [${part2}] [${Math.floor(total/2)}]\nRight: [${part2}] [${part1}] [${total - Math.floor(total/2)}]`,
                        answer: `${part1}+${part2}, ${part2}+${part1}`,
                        format: 'Drag & Match Pairs',
                        interaction: 'Drag & Drop'
                    };
                } else if (type === 'fact_family_complete') {
                    return {
                        text: `Complete the fact family for ${total}:`,
                        visual: `${part1} + ${part2} = ${total}\n${part2} + ___ = ${total}\n${total} - ${part1} = ___\n${total} - ___ = ${part1}`,
                        answer: `${part1}, ${part2}, ${part2}`,
                        format: 'Fact Family Completion',
                        interaction: 'Type Answer'
                    };
                } else if (type === 'true_false') {
                    const statements = [
                        [`${part1} + ${part2} = ${total}`, true],
                        [`${total} - ${part1} = ${part2}`, true],
                        [`${part1} + ${part2} = ${total + 1}`, false],
                        [`${total} - ${part2} = ${part1 + 1}`, false]
                    ];
                    const [statement, isTrue] = random(statements);
                    return {
                        text: statement,
                        interactive: `Click: [TRUE] or [FALSE]`,
                        answer: isTrue ? 'TRUE' : 'FALSE',
                        format: 'True/False',
                        interaction: 'Click'
                    };
                } else if (type === 'part_whole_drag') {
                    return {
                        text: `Complete the part-whole model:`,
                        interactive: `Whole: [${total}]\nParts: [${part1}] [___]\n\nDrag: [${part2}] [${part2+1}] [${part2-1}]`,
                        answer: part2.toString(),
                        format: 'Part-Whole Model',
                        interaction: 'Drag & Drop'
                    };
                } else if (type === 'balance_equation') {
                    return {
                        text: `Balance the equation. What goes in the box?`,
                        interactive: `${part1} + ☐ = ${total}\n\nClick: [${part2}] [${part2+1}] [${part2-1}] [${total-part1-1}]`,
                        answer: part2.toString(),
                        format: 'Balance Equation',
                        interaction: 'Click'
                    };
                } else if (type === 'word_problem') {
                    const context = random(contexts.objects);
                    return {
                        text: `Tom has ${total} ${context}. He gives ${part1} to his friend. How many does he have left?`,
                        answer: part2.toString(),
                        format: 'Word Problem',
                        interaction: 'Type Answer'
                    };
                } else {
                    return {
                        text: `${part1} + ? = ${total}`,
                        answer: part2.toString(),
                        format: 'Standard Equation',
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
            
            // MULTIPLICATION QUESTIONS
            else if (module.id === 'Y3_C2_multiply') {
                const tables = params.times_tables[level];
                const table = random(tables);
                const multiplier = Math.floor(Math.random() * params.max_multiplier[level]) + 1;
                const product = table * multiplier;

                if (type === 'drag_match_division') {
                    const equations = [
                        [`${table} × ${multiplier}`, product],
                        [`${product} ÷ ${table}`, multiplier],
                        [`${product} ÷ ${multiplier}`, table]
                    ];
                    return {
                        text: `Match each equation to its answer:`,
                        interactive: `Drag to match:\nLeft: ${equations.map(e => e[0]).join(' | ')}\nRight: ${shuffle(equations.map(e => e[1])).join(' | ')}`,
                        answer: equations.map(e => `${e[0]}=${e[1]}`).join(', '),
                        format: 'Drag & Match',
                        interaction: 'Drag & Drop'
                    };
                } else if (type === 'fact_family') {
                    return {
                        text: `Complete the fact family:`,
                        visual: `${table} × ${multiplier} = ${product}\n${multiplier} × ${table} = ___\n${product} ÷ ${table} = ___\n${product} ÷ ${multiplier} = ___`,
                        answer: `${product}, ${multiplier}, ${table}`,
                        format: 'Fact Family',
                        interaction: 'Type Answer'
                    };
                } else if (type === 'true_false') {
                    const statements = [
                        [`${table} × ${multiplier} = ${product}`, true],
                        [`${product} ÷ ${table} = ${multiplier}`, true],
                        [`${table} × ${multiplier} = ${product + table}`, false],
                        [`${product} ÷ ${multiplier} = ${table + 1}`, false]
                    ];
                    const [statement, isTrue] = random(statements);
                    return {
                        text: statement,
                        interactive: `Click: [TRUE] or [FALSE]`,
                        answer: isTrue ? 'TRUE' : 'FALSE',
                        format: 'True/False',
                        interaction: 'Click'
                    };
                } else if (type === 'array_click') {
                    return {
                        text: `An array has ${table} rows and ${multiplier} columns. How many items total?`,
                        interactive: `Click the answer: [${product}] [${product + table}] [${table + multiplier}] [${product - table}]`,
                        answer: product.toString(),
                        format: 'Array Representation',
                        interaction: 'Click'
                    };
                } else if (type === 'word_problem') {
                    const context = random(contexts.objects);
                    return {
                        text: `There are ${multiplier} boxes with ${table} ${context} in each. How many ${context} in total?`,
                        answer: product.toString(),
                        format: 'Word Problem',
                        interaction: 'Type Answer'
                    };
                } else if (type === 'error_analysis') {
                    const wrongAnswer = product + table;
                    return {
                        text: `Jamie says ${table} × ${multiplier} = ${wrongAnswer}. Is Jamie correct?`,
                        interactive: `Click: [YES] or [NO]\nIf NO, what's the correct answer? [___]`,
                        answer: `NO, ${product}`,
                        format: 'Error Analysis',
                        interaction: 'Click + Type'
                    };
                } else {
                    return {
                        text: `${table} × ${multiplier} = ?`,
                        interactive: `Click: [${product}] [${product + table}] [${product - table}] [${table + multiplier}]`,
                        answer: product.toString(),
                        format: 'Multiple Choice',
                        interaction: 'Click'
                    };
                }
            }
            
            // FRACTIONS QUESTIONS
            else if (module.id === 'Y4_F1_fractions') {
                const denoms = params.denominators[level];
                const denom1 = random(denoms);
                const multiplier = Math.floor(Math.random() * 3) + 2;
                const denom2 = denom1 * multiplier;
                const num1 = Math.floor(Math.random() * denom1) + 1;
                const num2 = num1 * multiplier;

                if (type === 'drag_match') {
                    const fractions = [
                        [`${num1}/${denom1}`, `${num2}/${denom2}`],
                        [`${num1 + 1}/${denom1}`, `${(num1 + 1) * multiplier}/${denom2}`]
                    ];
                    return {
                        text: `Match the equivalent fractions:`,
                        interactive: `Drag to match:\nLeft: ${fractions.map(f => f[0]).join(' | ')}\nRight: ${shuffle(fractions.map(f => f[1])).join(' | ')}`,
                        answer: fractions.map(f => `${f[0]}=${f[1]}`).join(', '),
                        format: 'Drag & Match',
                        interaction: 'Drag & Drop'
                    };
                } else if (type === 'true_false_equiv') {
                    const statements = [
                        [`${num1}/${denom1} = ${num2}/${denom2}`, true],
                        [`${num1}/${denom1} = ${num2 + 1}/${denom2}`, false],
                        [`${num1}/${denom1} = ${num2}/${denom2 + 1}`, false]
                    ];
                    const [statement, isTrue] = random(statements);
                    return {
                        text: statement,
                        interactive: `Click: [TRUE] or [FALSE]`,
                        answer: isTrue ? 'TRUE' : 'FALSE',
                        format: 'True/False',
                        interaction: 'Click'
                    };
                } else if (type === 'select_all_equivalent') {
                    const equiv = [`${num2}/${denom2}`, `${num1 * 3}/${denom1 * 3}`, `${num1 * 4}/${denom1 * 4}`];
                    const notEquiv = [`${num1 + 1}/${denom1}`, `${num2}/${denom2 + 1}`];
                    const all = shuffle([...equiv.slice(0, 2), ...notEquiv.slice(0, 2)]);
                    return {
                        text: `Select ALL fractions equivalent to ${num1}/${denom1}:`,
                        interactive: `Click all that apply:\n${all.map(f => `[${f}]`).join(' ')}`,
                        answer: equiv.slice(0, 2).join(', '),
                        format: 'Select All That Apply',
                        interaction: 'Multi-Select'
                    };
                } else if (type === 'ordering') {
                    const fracs = [`${num1}/${denom1}`, `${num1 + 1}/${denom1}`, `${num1 - 1}/${denom1}`].filter(f => !f.includes('-'));
                    const shuffled = shuffle(fracs);
                    return {
                        text: `Drag to order from smallest to largest:`,
                        interactive: `Drag: ${shuffled.map(f => `[${f}]`).join(' ')}\nTo: [___] [___] [___]`,
                        answer: fracs.join(', '),
                        format: 'Ordering',
                        interaction: 'Drag & Drop'
                    };
                } else if (type === 'simplify') {
                    return {
                        text: `Simplify ${num2}/${denom2} by clicking the simplified form:`,
                        interactive: `Click: [${num1}/${denom1}] [${num2}/${denom1}] [${num1}/${denom2}] [${num1 + 1}/${denom1}]`,
                        answer: `${num1}/${denom1}`,
                        format: 'Simplification',
                        interaction: 'Click'
                    };
                } else {
                    return {
                        text: `${num1}/${denom1} = ?/${denom2}`,
                        interactive: `Type the missing number: [___]/${denom2}`,
                        answer: num2.toString(),
                        format: 'Fill in the Blank',
                        interaction: 'Type Answer'
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

        init();
    </script>
</body>
</html>
```

---
### `docs\national_curriculum_framework_excel.csv`
**Type:** csv

```csv
﻿Strand,Substrand,Content domain reference,Year,Module
Number and place value,counting (in multiples),N1,Year 1,"count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens"
Number and place value,counting (in multiples),N1,Year 2,"count in steps of 2, 3, and 5 from 0, and in tens from any number, forward or backward"
Number and place value,counting (in multiples),N1,Year 3,"count from 0 in multiples of 4, 8, 50 and 100"
Number and place value,counting (in multiples),N1,Year 4,"count in multiples of 6, 7, 9, 25 and 1,000"
Number and place value,counting (in multiples),N1,Year 5,"count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000"
Number and place value,counting (in multiples),N1,Year 6,
Number and place value,"read, write, order and compare numbers",N2,Year 1,"count, read and write numbers to 100 in numerals; given a number, identify one more and one less; read and write numbers from 1 to 20 in numerals and words"
Number and place value,"read, write, order and compare numbers",N2,Year 2,"read and write numbers to at least 100 in numerals and in words; compare and order numbers from 0 up to 100; use <, > and = signs"
Number and place value,"read, write, order and compare numbers",N2,Year 3,"compare and order numbers up to 1,000; read and write numbers to 1,000 in numerals and in words; find 10 or 100 more or less than a given number"
Number and place value,"read, write, order and compare numbers",N2,Year 4,"order and compare numbers beyond 1,000; find 1,000 more or less than a given number"
Number and place value,"read, write, order and compare numbers",N2,Year 5,"read, write, order and compare numbers to at least 1,000,000"
Number and place value,"read, write, order and compare numbers",N2,Year 6,"read, write, order and compare numbers up to 10,000,000"
Number and place value,place value; roman numerals,N3,Year 1,
Number and place value,place value; roman numerals,N3,Year 2,"recognise the place value of each digit in a two-digit number (tens, ones)"
Number and place value,place value; roman numerals,N3,Year 3,"recognise the place value of each digit in a three-digit number (hundreds, tens, ones)"
Number and place value,place value; roman numerals,N3,Year 4,"recognise the place value of each digit in a four-digit number (thousands, hundreds, tens and ones); read Roman numerals to 100 (I to C) and know that over time, the numeral system changed to include the concept of zero and place value"
Number and place value,place value; roman numerals,N3,Year 5,"determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M) and recognise years written in Roman numerals"
Number and place value,place value; roman numerals,N3,Year 6,"determine the value of each digit in numbers up to 10,000,000"
Number and place value,"identify, represent and estimate; rounding",N4,Year 1,"identify and represent numbers using objects and pictorial representations including the number line, and use the language of: equal to, more than, less than (fewer), most, least"
Number and place value,"identify, represent and estimate; rounding",N4,Year 2,"identify, represent and estimate numbers using different representations, including the number line"
Number and place value,"identify, represent and estimate; rounding",N4,Year 3,"identify, represent and estimate numbers using different representations"
Number and place value,"identify, represent and estimate; rounding",N4,Year 4,"identify, represent and estimate numbers using different representations; round any number to the nearest 10, 100 or 1,000"
Number and place value,"identify, represent and estimate; rounding",N4,Year 5,"round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000"
Number and place value,"identify, represent and estimate; rounding",N4,Year 6,round any whole number to a required degree of accuracy
Number and place value,negative numbers,N5,Year 1,
Number and place value,negative numbers,N5,Year 2,
Number and place value,negative numbers,N5,Year 3,
Number and place value,negative numbers,N5,Year 4,count backwards through zero to include negative numbers
Number and place value,negative numbers,N5,Year 5,"interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero"
Number and place value,negative numbers,N5,Year 6,"use negative numbers in context, and calculate intervals across zero"
Number and place value,number problems,N6,Year 1,
Number and place value,number problems,N6,Year 2,use place value and number facts to solve problems
Number and place value,number problems,N6,Year 3,solve number problems and practical problems involving 3N1-3N4
Number and place value,number problems,N6,Year 4,solve number and practical problems that involve 4N1-4N5 and with increasingly large positive numbers
Number and place value,number problems,N6,Year 5,solve number problems and practical problems that involve 5N1-5N5
Number and place value,number problems,N6,Year 6,solve number problems and practical problems that involve 6N2-6N5
"Addition, subtraction, multiplication and division (calculations)",add / subtract mentally,C1,Year 1,represent and use number bonds and related subtraction facts within 20
"Addition, subtraction, multiplication and division (calculations)",add / subtract mentally,C1,Year 2,"recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100"
"Addition, subtraction, multiplication and division (calculations)",add / subtract mentally,C1,Year 3,"add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds"
"Addition, subtraction, multiplication and division (calculations)",add / subtract mentally,C1,Year 4,
"Addition, subtraction, multiplication and division (calculations)",add / subtract mentally,C1,Year 5,add and subtract numbers mentally with increasingly large numbers
"Addition, subtraction, multiplication and division (calculations)",add / subtract mentally,C1,Year 6,
"Addition, subtraction, multiplication and division (calculations)",add / subtract using written methods,C2,Year 1,"add and subtract one-digit and two-digit numbers to 20, including zero; read, write and interpret mathematical statements involving addition (+), subtraction (–) and equals (=) signs"
"Addition, subtraction, multiplication and division (calculations)",add / subtract using written methods,C2,Year 2,"add and subtract numbers using concrete objects, pictorial representations, and mentally, including: a two-digit number and ones, a two-digit number and tens, two two-digit numbers, adding three one-digit numbers"
"Addition, subtraction, multiplication and division (calculations)",add / subtract using written methods,C2,Year 3,"add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction"
"Addition, subtraction, multiplication and division (calculations)",add / subtract using written methods,C2,Year 4,add and subtract numbers with up to 4 digits using the formal written methods of columnar addition and subtraction where appropriate
"Addition, subtraction, multiplication and division (calculations)",add / subtract using written methods,C2,Year 5,"add and subtract whole numbers with more than 4 digits, including using formal written methods (columnar addition and subtraction)"
"Addition, subtraction, multiplication and division (calculations)",add / subtract using written methods,C2,Year 6,
"Addition, subtraction, multiplication and division (calculations)","estimate, use inverses and check",C3,Year 1,
"Addition, subtraction, multiplication and division (calculations)","estimate, use inverses and check",C3,Year 2,recognise and use the inverse relationship between addition and subtraction and use this to check calculations and missing number problems
"Addition, subtraction, multiplication and division (calculations)","estimate, use inverses and check",C3,Year 3,estimate the answer to a calculation and use inverse operations to check answers
"Addition, subtraction, multiplication and division (calculations)","estimate, use inverses and check",C3,Year 4,estimate and use inverse operations to check answers to a calculation
"Addition, subtraction, multiplication and division (calculations)","estimate, use inverses and check",C3,Year 5,"use rounding to check answers to calculations and determine, in the context of a problem, levels of accuracy"
"Addition, subtraction, multiplication and division (calculations)","estimate, use inverses and check",C3,Year 6,"use estimation to check answers to calculations and determine, in the context of a problem, an appropriate degree of accuracy"
"Addition, subtraction, multiplication and division (calculations)",add / subtract to solve problems,C4,Year 1,"solve one-step problems that involve addition and subtraction, using concrete objects and pictorial representations, and missing number problems such as 7 = _ – 9"
"Addition, subtraction, multiplication and division (calculations)",add / subtract to solve problems,C4,Year 2,"solve problems with addition and subtraction: using concrete objects and pictorial representations, including those involving numbers, quantities and measures; applying their increasing knowledge of mental and written methods"
"Addition, subtraction, multiplication and division (calculations)",add / subtract to solve problems,C4,Year 3,"solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction"
"Addition, subtraction, multiplication and division (calculations)",add / subtract to solve problems,C4,Year 4,"solve addition and subtraction two-step problems in contexts, deciding which operations and methods to use and why"
"Addition, subtraction, multiplication and division (calculations)",add / subtract to solve problems,C4,Year 5,"solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why"
"Addition, subtraction, multiplication and division (calculations)",add / subtract to solve problems,C4,Year 6,"solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why"
"Addition, subtraction, multiplication and division (calculations)","properties of number (multiples, factors, primes, squares and cubes)",C5,Year 1,
"Addition, subtraction, multiplication and division (calculations)","properties of number (multiples, factors, primes, squares and cubes)",C5,Year 2,
"Addition, subtraction, multiplication and division (calculations)","properties of number (multiples, factors, primes, squares and cubes)",C5,Year 3,
"Addition, subtraction, multiplication and division (calculations)","properties of number (multiples, factors, primes, squares and cubes)",C5,Year 4,
"Addition, subtraction, multiplication and division (calculations)","properties of number (multiples, factors, primes, squares and cubes)",C5,Year 5,"identify multiples and factors, including finding all factor pairs of a number and common factors of two numbers; know and use the vocabulary of prime numbers, prime factors and composite (non-prime) numbers; establish whether a number up to 100 is prime and recall prime numbers up to 19; recognise and use square numbers and cube numbers, and the notation for squared (²) and cubed (³)"
"Addition, subtraction, multiplication and division (calculations)","properties of number (multiples, factors, primes, squares and cubes)",C5,Year 6,"identify common factors, common multiples and prime numbers"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide mentally,C6,Year 1,
"Addition, subtraction, multiplication and division (calculations)",multiply / divide mentally,C6,Year 2,"recall and use multiplication and division facts for the 2, 5 and 10 multiplication tables, including recognising odd and even numbers"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide mentally,C6,Year 3,"recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide mentally,C6,Year 4,"recall multiplication and division facts for multiplication tables up to 12 x 12; use place value, known and derived facts to multiply and divide mentally, including: multiplying by 0 and 1, dividing by 1, multiplying together three numbers; recognise and use factor pairs and commutativity in mental calculations"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide mentally,C6,Year 5,"multiply and divide numbers mentally drawing upon known facts; multiply and divide whole numbers and those involving decimals by 10, 100 and 1,000"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide mentally,C6,Year 6,"perform mental calculations, including with mixed operations and large numbers"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide using written methods,C7,Year 1,
"Addition, subtraction, multiplication and division (calculations)",multiply / divide using written methods,C7,Year 2,"calculate mathematical statements for multiplication and division within the multiplication tables and write them using the multiplication (×), division (÷) and equals (=) signs"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide using written methods,C7,Year 3,"write and calculate mathematical statements for multiplication and division using the multiplication tables that pupils know, including for two-digit numbers times one-digit numbers, using mental and progressing to formal written methods"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide using written methods,C7,Year 4,multiply two-digit and three-digit numbers by a one-digit number using formal written layout
"Addition, subtraction, multiplication and division (calculations)",multiply / divide using written methods,C7,Year 5,"multiply numbers up to 4 digits by a one- or two-digit number using a formal written method, including long multiplication for two-digit numbers; divide numbers up to 4 digits by a one-digit number using the formal written method of short division and interpret remainders appropriately for the context"
"Addition, subtraction, multiplication and division (calculations)",multiply / divide using written methods,C7,Year 6,"multiply multi-digit numbers up to 4 digits by a two-digit whole number using the formal written method of long multiplication; divide numbers up to 4 digits by a two-digit whole number using the formal written method of long division, and interpret remainders as whole number remainders, fractions, or by rounding, as appropriate for the context; divide numbers up to 4 digits by a two-digit number using the formal written method of short division where appropriate, interpreting remainders according to the context"
"Addition, subtraction, multiplication and division (calculations)","solve problems (commutative, associative, distributive and all four operations)",C8,Year 1,"solve one-step problems involving multiplication and division, by calculating the answer using concrete objects, pictorial representations and arrays with the support of the teacher"
"Addition, subtraction, multiplication and division (calculations)","solve problems (commutative, associative, distributive and all four operations)",C8,Year 2,"solve problems involving multiplication and division, using materials, arrays, repeated addition, mental methods, and multiplication and division facts, including problems in contexts; show that addition of two numbers can be done in any order (commutative) and subtraction of one number from another cannot; show that multiplication of two numbers can be done in any order (commutative) and division of one number by another cannot"
"Addition, subtraction, multiplication and division (calculations)","solve problems (commutative, associative, distributive and all four operations)",C8,Year 3,"solve problems, including missing number problems, involving multiplication and division, including integer scaling problems and correspondence problems in which n objects are connected to m objects"
"Addition, subtraction, multiplication and division (calculations)","solve problems (commutative, associative, distributive and all four operations)",C8,Year 4,"solve problems involving multiplying and adding, including using the distributive law to multiply two-digit numbers by one digit, integer scaling problems and harder correspondence problems such as n objects are connected to m objects"
"Addition, subtraction, multiplication and division (calculations)","solve problems (commutative, associative, distributive and all four operations)",C8,Year 5,"solve problems involving multiplication and division including using their knowledge of factors and multiples, squares and cubes; solve problems involving addition, subtraction, multiplication and division and a combination of these, including understanding the meaning of the equals sign; solve problems involving multiplication and division including scaling by simple fractions and problems involving simple rates"
"Addition, subtraction, multiplication and division (calculations)","solve problems (commutative, associative, distributive and all four operations)",C8,Year 6,"solve problems involving addition, subtraction, multiplication and division"
"Addition, subtraction, multiplication and division (calculations)",order of operations,C9,Year 1,
"Addition, subtraction, multiplication and division (calculations)",order of operations,C9,Year 2,
"Addition, subtraction, multiplication and division (calculations)",order of operations,C9,Year 3,
"Addition, subtraction, multiplication and division (calculations)",order of operations,C9,Year 4,
"Addition, subtraction, multiplication and division (calculations)",order of operations,C9,Year 5,
"Addition, subtraction, multiplication and division (calculations)",order of operations,C9,Year 6,use their knowledge of the order of operations to carry out calculations involving the four operations
"Fractions, decimals and percentages","recognise, find, write, name and count fractions",F1,Year 1,"recognise, find and name a half as one of two equal parts of an object, shape or quantity; recognise, find and name a quarter as one of four equal parts of an object, shape or quantity"
"Fractions, decimals and percentages","recognise, find, write, name and count fractions",F1,Year 2,"recognise, find, name and write fractions ⅓, ¼, ²⁄₄ and ¾ of a length, shape, set of objects or quantity; write simple fractions, for example, ½ of 6 = 3"
"Fractions, decimals and percentages","recognise, find, write, name and count fractions",F1,Year 3,"count up and down in tenths, recognise that tenths arise from dividing an object into 10 equal parts and in dividing one-digit numbers or quantities by 10; recognise, find and write fractions of a discrete set of objects: unit fractions and non-unit fractions with small denominators; recognise and use fractions as numbers: unit fractions and non-unit fractions with small denominators"
"Fractions, decimals and percentages","recognise, find, write, name and count fractions",F1,Year 4,count up and down in hundredths; recognise that hundredths arise when dividing an object by a hundred and dividing tenths by ten
"Fractions, decimals and percentages","recognise, find, write, name and count fractions",F1,Year 5,
"Fractions, decimals and percentages","recognise, find, write, name and count fractions",F1,Year 6,
"Fractions, decimals and percentages",equivalent fractions,F2,Year 1,
"Fractions, decimals and percentages",equivalent fractions,F2,Year 2,recognise the equivalence of ²⁄₄ and ½
"Fractions, decimals and percentages",equivalent fractions,F2,Year 3,"recognise and show, using diagrams, equivalent fractions with small denominators"
"Fractions, decimals and percentages",equivalent fractions,F2,Year 4,"recognise and show, using diagrams, families of common equivalent fractions"
"Fractions, decimals and percentages",equivalent fractions,F2,Year 5,"recognise mixed numbers and improper fractions and convert from one form to the other; write mathematical statements >1 as a mixed number [e.g. ⅖ + ⅘ = ⁶⁄₅ = 1⅕]; identify name and write equivalent fractions of a given fraction, represented visually, including tenths and hundredths"
"Fractions, decimals and percentages",equivalent fractions,F2,Year 6,use common factors to simplify fractions; use common multiples to express fractions in the same denomination
"Fractions, decimals and percentages",comparing and ordering fractions,F3,Year 1,
"Fractions, decimals and percentages",comparing and ordering fractions,F3,Year 2,
"Fractions, decimals and percentages",comparing and ordering fractions,F3,Year 3,compare and order unit fractions and fractions with the same denominators
"Fractions, decimals and percentages",comparing and ordering fractions,F3,Year 4,
"Fractions, decimals and percentages",comparing and ordering fractions,F3,Year 5,compare and order fractions whose denominators are all multiples of the same number
"Fractions, decimals and percentages",comparing and ordering fractions,F3,Year 6,"compare and order fractions, including fractions > 1"
"Fractions, decimals and percentages",add / subtract fractions,F4,Year 1,
"Fractions, decimals and percentages",add / subtract fractions,F4,Year 2,
"Fractions, decimals and percentages",add / subtract fractions,F4,Year 3,add and subtract fractions with the same denominator within one whole [e.g. ⅚ + ⅚ = ⁶⁄₇]
"Fractions, decimals and percentages",add / subtract fractions,F4,Year 4,add and subtract fractions with the same denominator
"Fractions, decimals and percentages",add / subtract fractions,F4,Year 5,add and subtract fractions with the same denominator and denominators that are multiples of the same number
"Fractions, decimals and percentages",add / subtract fractions,F4,Year 6,"add and subtract fractions with different denominators and mixed numbers, using the concept of equivalent fractions"
"Fractions, decimals and percentages",multiply / divide fractions,F5,Year 1,
"Fractions, decimals and percentages",multiply / divide fractions,F5,Year 2,
"Fractions, decimals and percentages",multiply / divide fractions,F5,Year 3,
"Fractions, decimals and percentages",multiply / divide fractions,F5,Year 4,
"Fractions, decimals and percentages",multiply / divide fractions,F5,Year 5,"multiply proper fractions and mixed numbers by whole numbers, supported by materials and diagrams"
"Fractions, decimals and percentages",multiply / divide fractions,F5,Year 6,"multiply simple pairs of proper fractions, writing the answer in its simplest form [e.g. ¼ x ½ = ⅛]; divide proper fractions by whole numbers [e.g. ⅓ ÷ 2 = ⅙]"
"Fractions, decimals and percentages",fractions / decimals equivalence,F6,Year 1,
"Fractions, decimals and percentages",fractions / decimals equivalence,F6,Year 2,
"Fractions, decimals and percentages",fractions / decimals equivalence,F6,Year 3,
"Fractions, decimals and percentages",fractions / decimals equivalence,F6,Year 4,"recognise and write decimal equivalents to ¼, ½, ¾; recognise and write decimal equivalents of any number of tenths or hundredths"
"Fractions, decimals and percentages",fractions / decimals equivalence,F6,Year 5,"read and write decimal numbers as fractions [e.g. 0.71 = ⁷¹⁄₁₀₀]; recognise and use thousandths and relate them to tenths, hundredths and decimal equivalents"
"Fractions, decimals and percentages",fractions / decimals equivalence,F6,Year 6,associate a fraction with division to calculate decimal fraction equivalents (e.g. 0.375) for a simple fraction [e.g. ⅜]
"Fractions, decimals and percentages",rounding decimals,F7,Year 1,
"Fractions, decimals and percentages",rounding decimals,F7,Year 2,
"Fractions, decimals and percentages",rounding decimals,F7,Year 3,
"Fractions, decimals and percentages",rounding decimals,F7,Year 4,round decimals with one decimal place to the nearest whole number
"Fractions, decimals and percentages",rounding decimals,F7,Year 5,round decimals with two decimal places to the nearest whole number and to one decimal place
"Fractions, decimals and percentages",rounding decimals,F7,Year 6,
"Fractions, decimals and percentages",compare and order decimals,F8,Year 1,
"Fractions, decimals and percentages",compare and order decimals,F8,Year 2,
"Fractions, decimals and percentages",compare and order decimals,F8,Year 3,
"Fractions, decimals and percentages",compare and order decimals,F8,Year 4,compare numbers with the same number of decimal places up to two decimal places
"Fractions, decimals and percentages",compare and order decimals,F8,Year 5,"read, write, order and compare numbers with up to three decimal places"
"Fractions, decimals and percentages",compare and order decimals,F8,Year 6,
"Fractions, decimals and percentages",multiply / divide decimals,F9,Year 1,
"Fractions, decimals and percentages",multiply / divide decimals,F9,Year 2,
"Fractions, decimals and percentages",multiply / divide decimals,F9,Year 3,
"Fractions, decimals and percentages",multiply / divide decimals,F9,Year 4,"find the effect of dividing a one- or two-digit number by 10 and 100, identifying the value of the digits in the answer as ones, tenths and hundredths"
"Fractions, decimals and percentages",multiply / divide decimals,F9,Year 5,
"Fractions, decimals and percentages",multiply / divide decimals,F9,Year 6,"identify the value of each digit to three decimal places and multiply and divide numbers by 10, 100 and 1,000 giving answers up to three decimal places; multiply one-digit numbers with up to two-decimal places by whole numbers; use written division methods in cases where the answer has up to two-decimal places"
"Fractions, decimals and percentages",solve problems with fractions and decimals,F10,Year 1,
"Fractions, decimals and percentages",solve problems with fractions and decimals,F10,Year 2,
"Fractions, decimals and percentages",solve problems with fractions and decimals,F10,Year 3,solve problems that involve 3F1-3F4
"Fractions, decimals and percentages",solve problems with fractions and decimals,F10,Year 4,"solve problems involving increasingly harder fractions to calculate quantities and fractions to divide quantities, including non-unit fractions where the answer is a whole number; solve simple measure and money problems involving fractions and decimals to two decimal places"
"Fractions, decimals and percentages",solve problems with fractions and decimals,F10,Year 5,solve problems involving numbers up to three decimal places
"Fractions, decimals and percentages",solve problems with fractions and decimals,F10,Year 6,solve problems which require answers to be rounded to specified degrees of accuracy
"Fractions, decimals and percentages",fractions / decimal / percentage equivalence,F11,Year 1,
"Fractions, decimals and percentages",fractions / decimal / percentage equivalence,F11,Year 2,
"Fractions, decimals and percentages",fractions / decimal / percentage equivalence,F11,Year 3,
"Fractions, decimals and percentages",fractions / decimal / percentage equivalence,F11,Year 4,
"Fractions, decimals and percentages",fractions / decimal / percentage equivalence,F11,Year 5,"recognise the per cent symbol (%) and understand that per cent relates to 'number of parts per hundred'; write percentages as a fraction with denominator hundred, and as a decimal"
"Fractions, decimals and percentages",fractions / decimal / percentage equivalence,F11,Year 6,"recall and use equivalences between simple fractions, decimals and percentages, including in different contexts"
"Fractions, decimals and percentages",solve problems with percentages,F12,Year 1,
"Fractions, decimals and percentages",solve problems with percentages,F12,Year 2,
"Fractions, decimals and percentages",solve problems with percentages,F12,Year 3,
"Fractions, decimals and percentages",solve problems with percentages,F12,Year 4,
"Fractions, decimals and percentages",solve problems with percentages,F12,Year 5,"solve problems that require knowing percentage and decimal equivalents of ½, ¼, ⅕, ⅖, ⅘ and those fractions with a denominator of a multiple of 10 or 25"
"Fractions, decimals and percentages",solve problems with percentages,F12,Year 6,
Ratio and proportion,"relative sizes, similarity",R1,Year 1,
Ratio and proportion,"relative sizes, similarity",R1,Year 2,
Ratio and proportion,"relative sizes, similarity",R1,Year 3,
Ratio and proportion,"relative sizes, similarity",R1,Year 4,
Ratio and proportion,"relative sizes, similarity",R1,Year 5,
Ratio and proportion,"relative sizes, similarity",R1,Year 6,"solve problems involving the relative sizes of two quantities, where missing values can be found by using integer multiplication and division facts"
Ratio and proportion,use of percentages for comparison,R2,Year 1,
Ratio and proportion,use of percentages for comparison,R2,Year 2,
Ratio and proportion,use of percentages for comparison,R2,Year 3,
Ratio and proportion,use of percentages for comparison,R2,Year 4,
Ratio and proportion,use of percentages for comparison,R2,Year 5,
Ratio and proportion,use of percentages for comparison,R2,Year 6,solve problems involving the calculation of percentages [e.g. of measures such as 15% of 360] and the use of percentages for comparison
Ratio and proportion,scale factors,R3,Year 1,
Ratio and proportion,scale factors,R3,Year 2,
Ratio and proportion,scale factors,R3,Year 3,
Ratio and proportion,scale factors,R3,Year 4,
Ratio and proportion,scale factors,R3,Year 5,
Ratio and proportion,scale factors,R3,Year 6,solve problem involving similar shapes where the scale factor is known or can be found
Ratio and proportion,unequal sharing and grouping,R4,Year 1,
Ratio and proportion,unequal sharing and grouping,R4,Year 2,
Ratio and proportion,unequal sharing and grouping,R4,Year 3,
Ratio and proportion,unequal sharing and grouping,R4,Year 4,
Ratio and proportion,unequal sharing and grouping,R4,Year 5,
Ratio and proportion,unequal sharing and grouping,R4,Year 6,solve problems involving unequal sharing and grouping using knowledge of fractions and multiples
Algebra,missing number problems expressed in algebra,A1,Year 1,
Algebra,missing number problems expressed in algebra,A1,Year 2,
Algebra,missing number problems expressed in algebra,A1,Year 3,
Algebra,missing number problems expressed in algebra,A1,Year 4,
Algebra,missing number problems expressed in algebra,A1,Year 5,
Algebra,missing number problems expressed in algebra,A1,Year 6,express missing number problems algebraically
Algebra,simple formulae expressed in words,A2,Year 1,
Algebra,simple formulae expressed in words,A2,Year 2,
Algebra,simple formulae expressed in words,A2,Year 3,
Algebra,simple formulae expressed in words,A2,Year 4,
Algebra,simple formulae expressed in words,A2,Year 5,
Algebra,simple formulae expressed in words,A2,Year 6,use simple formulae
Algebra,generate and describe linear number sequences,A3,Year 1,
Algebra,generate and describe linear number sequences,A3,Year 2,
Algebra,generate and describe linear number sequences,A3,Year 3,
Algebra,generate and describe linear number sequences,A3,Year 4,
Algebra,generate and describe linear number sequences,A3,Year 5,
Algebra,generate and describe linear number sequences,A3,Year 6,generate and describe linear number sequences
Algebra,number sentences involving two unknowns,A4,Year 1,
Algebra,number sentences involving two unknowns,A4,Year 2,
Algebra,number sentences involving two unknowns,A4,Year 3,
Algebra,number sentences involving two unknowns,A4,Year 4,
Algebra,number sentences involving two unknowns,A4,Year 5,
Algebra,number sentences involving two unknowns,A4,Year 6,find pairs of numbers that satisfy an equation with two unknowns
Algebra,enumerate all possibilities of combinations of two variables,A5,Year 1,
Algebra,enumerate all possibilities of combinations of two variables,A5,Year 2,
Algebra,enumerate all possibilities of combinations of two variables,A5,Year 3,
Algebra,enumerate all possibilities of combinations of two variables,A5,Year 4,
Algebra,enumerate all possibilities of combinations of two variables,A5,Year 5,
Algebra,enumerate all possibilities of combinations of two variables,A5,Year 6,enumerate possibilities of combinations of two variables
Measurement,"compare, describe and order measures",M1,Year 1,"compare, describe and solve practical problems for: lengths and heights (e.g. long/short, taller/shorter); mass/weight (e.g. heavy/light, heavier than); capacity and volume (e.g. full/empty, more than/less than); time (e.g. quicker, slower)"
Measurement,"compare, describe and order measures",M1,Year 2,"compare and order lengths, mass, volume/capacity and record the results using >, < and ="
Measurement,"compare, describe and order measures",M1,Year 3,compare lengths (m/cm/mm); compare mass (kg/g); compare volume/capacity (l/ml)
Measurement,"compare, describe and order measures",M1,Year 4,"compare different measures, including money in pounds and pence"
Measurement,"compare, describe and order measures",M1,Year 5,
Measurement,"compare, describe and order measures",M1,Year 6,
Measurement,"estimate, measure and read scales",M2,Year 1,"measure and begin to record: lengths and heights; mass/weight; capacity and volume; time (hours, minutes, seconds)"
Measurement,"estimate, measure and read scales",M2,Year 2,"choose and use appropriate standard units to estimate and measure: length/height (m/cm); mass (kg/g); temperature (°C); capacity (litres/ml) to the nearest appropriate unit, using rulers, scales, thermometers and measuring vessels"
Measurement,"estimate, measure and read scales",M2,Year 3,measure lengths (m/cm/mm); measure mass (kg/g); measure volume / capacity (l/ml)
Measurement,"estimate, measure and read scales",M2,Year 4,"estimate different measures, including money in pounds and pence"
Measurement,"estimate, measure and read scales",M2,Year 5,
Measurement,"estimate, measure and read scales",M2,Year 6,
Measurement,money,M3,Year 1,recognise and know the value of different denominations of coins and notes
Measurement,money,M3,Year 2,recognise and use symbols for pounds (£) and pence (p); combine amounts to make a particular value; find different combinations of coins that equal the same amounts of money
Measurement,money,M3,Year 3,Key stage 1 content domain
Measurement,money,M3,Year 4,
Measurement,money,M3,Year 5,
Measurement,money,M3,Year 6,
Measurement,"telling time, ordering time, duration and units of time",M4,Year 1,"tell the time to the hour and half past the hour and draw the hands on a clock face to show these times; sequence events in chronological order using language (e.g. before, after, next); recognise and use language relating to dates, including days of the week, weeks, months and years"
Measurement,"telling time, ordering time, duration and units of time",M4,Year 2,"tell and write the time to five minutes, including quarter past/to the hour and draw the hands on a clock face to show these times; compare and sequence intervals of time; know the number of minutes in an hour and the number of hours in a day"
Measurement,"telling time, ordering time, duration and units of time",M4,Year 3,"tell and write the time from an analogue clock; 12-hour clocks; tell and write the time from an analogue clock; 24-hour clocks; tell and write the time from an analogue clock, including using Roman numerals from I to XII; estimate and read time with increasing accuracy to the nearest minute; record and compare time in terms of seconds, minutes and hours; use vocabulary such as o'clock / a.m. / p.m., morning, afternoon, noon and midnight; know the number of seconds in a minute and the number of days in each month, year and leap year; compare durations of events, [e.g. to calculate the time taken by particular events or tasks]"
Measurement,"telling time, ordering time, duration and units of time",M4,Year 4,"read, write and convert time between analogue and digital 12-hour clocks; read, write and convert time between analogue and digital 24-hour clocks; solve problems involving converting from hours to minutes; minutes to seconds; years to months; weeks to days"
Measurement,"telling time, ordering time, duration and units of time",M4,Year 5,solve problems involving converting between units of time
Measurement,"telling time, ordering time, duration and units of time",M4,Year 6,
Measurement,convert between metric units,M5,Year 1,
Measurement,convert between metric units,M5,Year 2,
Measurement,convert between metric units,M5,Year 3,
Measurement,convert between metric units,M5,Year 4,
Measurement,convert between metric units,M5,Year 5,convert between different units of metric measure [e.g. kilometre and metre; centimetre and metre; centimetre and millimetre; gram and kilogram; litre and millilitre]
Measurement,convert between metric units,M5,Year 6,
Measurement,convert metric / imperial,M6,Year 1,
Measurement,convert metric / imperial,M6,Year 2,
Measurement,convert metric / imperial,M6,Year 3,
Measurement,convert metric / imperial,M6,Year 4,convert between different units of measurement [e.g. kilometre to metre; hour to minute]
Measurement,convert metric / imperial,M6,Year 5,"understand and use approximate equivalences between metric units and common imperial units such as inches, pounds and pints"
Measurement,convert metric / imperial,M6,Year 6,"use, read, write and convert between standard units, converting measurements of length, mass, volume and time from a smaller unit of measure to a larger unit, and vice versa, using decimal notation of up to three decimal places; convert between miles and kilometres"
Measurement,"perimeter, area",M7,Year 1,
Measurement,"perimeter, area",M7,Year 2,
Measurement,"perimeter, area",M7,Year 3,measure the perimeter of simple 2-D shapes
Measurement,"perimeter, area",M7,Year 4,measure and calculate the perimeter of a rectilinear figure (including squares) in centimetres and metres; find the area of rectilinear shapes by counting squares
Measurement,"perimeter, area",M7,Year 5,"measure and calculate the perimeter of composite rectilinear shapes in centimetres and metres; calculate and compare the area of rectangles (including squares), and including using standard units, square centimetres (cm²) and square metres (m²) and estimate the area of irregular shapes"
Measurement,"perimeter, area",M7,Year 6,recognise that shapes with the same areas can have different perimeters and vice versa; calculate the area of parallelograms and triangles; recognise when it is possible to use the formulae for the area of shapes
Measurement,volume,M8,Year 1,
Measurement,volume,M8,Year 2,
Measurement,volume,M8,Year 3,
Measurement,volume,M8,Year 4,
Measurement,volume,M8,Year 5,estimate volume [e.g. using 1 cm³ blocks to build cuboids (including cubes)] and capacity [e.g. using water]
Measurement,volume,M8,Year 6,"calculate, estimate and compare volume of cubes and cuboids using standard units, including centimetre cubed (cm³) and cubic metres (m³), and extending to other units [e.g. mm³ and km³]; recognise when it is possible to use the formulae for the volume of shapes"
Measurement,"solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)",M9,Year 1,
Measurement,"solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)",M9,Year 2,"solve simple problems in a practical context involving addition and subtraction of money of the same unit, including giving change"
Measurement,"solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)",M9,Year 3,"add and subtract amounts of money to give change, using both pounds (£) and pence (p) in practical contexts; add and subtract lengths (m/cm/mm); add and subtract mass (kg/g); add and subtract volume / capacity (l/ml)"
Measurement,"solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)",M9,Year 4,"calculate different measures, including money in pounds and pence"
Measurement,"solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)",M9,Year 5,"use all four operations to solve problems involving measures [money] using decimal notation, including scaling; use all four operations to solve problems involving measure [e.g. length] using decimal notation, including scaling; use all four operations to solve problems involving measure [e.g. mass] using decimal notation, including scaling; use all four operations to solve problems involving measure [e.g. volume] using decimal notation, including scaling"
Measurement,"solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)",M9,Year 6,"solve problems involving the calculation and conversion of units of measure, using decimal notation up to three decimal places where appropriate"
Geometry – properties of shapes,recognise and name common shapes,G1,Year 1,"recognise and name common 2-D shapes (e.g. rectangles, squares, circles, triangles); recognise and name common 3-D shapes (e.g. cuboids, cubes, pyramids, spheres)"
Geometry – properties of shapes,recognise and name common shapes,G1,Year 2,compare and sort common 2-D and 3-D shapes and everyday objects
Geometry – properties of shapes,recognise and name common shapes,G1,Year 3,Within key stage 1 content domain
Geometry – properties of shapes,recognise and name common shapes,G1,Year 4,
Geometry – properties of shapes,recognise and name common shapes,G1,Year 5,
Geometry – properties of shapes,recognise and name common shapes,G1,Year 6,
Geometry – properties of shapes,describe properties and classify shapes,G2,Year 1,
Geometry – properties of shapes,describe properties and classify shapes,G2,Year 2,"identify and describe the properties of 2-D shapes, including the number of sides and line symmetry in a vertical line; identify and describe the properties of 3-D shapes, including the number of edges, vertices and faces"
Geometry – properties of shapes,describe properties and classify shapes,G2,Year 3,"identify horizontal, vertical lines and pairs of perpendicular and parallel lines"
Geometry – properties of shapes,describe properties and classify shapes,G2,Year 4,"compare and classify geometric shapes, including quadrilaterals and triangles based on their properties and sizes; identify lines of symmetry in 2-D shapes presented in different orientations; complete a simple symmetric figure with respect to a specific line of symmetry"
Geometry – properties of shapes,describe properties and classify shapes,G2,Year 5,use the properties of rectangles to deduce related facts and find missing lengths and angles; distinguish between regular and irregular polygons based on reasoning about equal sides and angles
Geometry – properties of shapes,describe properties and classify shapes,G2,Year 6,compare and classify geometric shapes based on their properties and sizes; describe simple 3-D shapes
Geometry – properties of shapes,draw and make shapes and relate 2-D to 3-D shapes (including nets),G3,Year 1,
Geometry – properties of shapes,draw and make shapes and relate 2-D to 3-D shapes (including nets),G3,Year 2,identify 2-D shapes on the surface of 3-D shapes (e.g. a circle on a cylinder and a triangle on a pyramid)
Geometry – properties of shapes,draw and make shapes and relate 2-D to 3-D shapes (including nets),G3,Year 3,draw 2-D shapes; make 3-D shapes using modelling materials; recognise 3-D shapes in different orientations and describe them
Geometry – properties of shapes,draw and make shapes and relate 2-D to 3-D shapes (including nets),G3,Year 4,
Geometry – properties of shapes,draw and make shapes and relate 2-D to 3-D shapes (including nets),G3,Year 5,"identify 3-D shapes including cubes and other cuboids, from 2-D representations"
Geometry – properties of shapes,draw and make shapes and relate 2-D to 3-D shapes (including nets),G3,Year 6,"draw 2-D shapes using given dimensions and angles; recognise and build simple 3-D shapes, including making nets"
Geometry – properties of shapes,angles – measuring and properties,G4,Year 1,
Geometry – properties of shapes,angles – measuring and properties,G4,Year 2,
Geometry – properties of shapes,angles – measuring and properties,G4,Year 3,"recognise that angles are a property of shape or a description of a turn; identify right angles, recognise that two right angles make a half-turn, three make three quarters of a turn and four a complete turn; identify whether angles are greater than or less than a right angle"
Geometry – properties of shapes,angles – measuring and properties,G4,Year 4,identify acute and obtuse angles and compare and order angles up to two right angles by size
Geometry – properties of shapes,angles – measuring and properties,G4,Year 5,"know angles are measured in degrees: estimate and compare acute, obtuse and reflex angles; identify: angles at a point and one whole turn (total 360°), angles at a point on a straight line and ½ a turn (total 180°), other multiples of 90°; draw given angles and measure them in degrees (°)"
Geometry – properties of shapes,angles – measuring and properties,G4,Year 6,"find unknown angles in any triangles, quadrilaterals and regular polygons; recognise angles where they meet at a point, are on a straight line, or are vertically opposite, and find missing angles"
Geometry – properties of shapes,circles,G5,Year 1,
Geometry – properties of shapes,circles,G5,Year 2,
Geometry – properties of shapes,circles,G5,Year 3,
Geometry – properties of shapes,circles,G5,Year 4,
Geometry – properties of shapes,circles,G5,Year 5,
Geometry – properties of shapes,circles,G5,Year 6,"illustrate and name parts of circles, including radius, diameter and circumference and know that the diameter is twice the radius"
Geometry - position and direction,patterns,P1,Year 1,
Geometry - position and direction,patterns,P1,Year 2,order and arrange combinations of mathematical objects in patterns and sequences
Geometry - position and direction,patterns,P1,Year 3,Within key stage 1 content domain
Geometry - position and direction,patterns,P1,Year 4,
Geometry - position and direction,patterns,P1,Year 5,
Geometry - position and direction,patterns,P1,Year 6,
Geometry - position and direction,"describe position, direction and movement",P2,Year 1,"describe position, direction and movement, including half, quarter and three-quarter turns"
Geometry - position and direction,"describe position, direction and movement",P2,Year 2,"use mathematical vocabulary to describe position, direction and movement, including movement in a straight line and distinguishing between rotation as a turn and in terms of right angles for quarter, half and three-quarter turns (clockwise and anti-clockwise)"
Geometry - position and direction,"describe position, direction and movement",P2,Year 3,
Geometry - position and direction,"describe position, direction and movement",P2,Year 4,describe movements between positions as translations of a given unit to the left / right and up / down
Geometry - position and direction,"describe position, direction and movement",P2,Year 5,"identify, describe and represent the position of a shape following a reflection or translation, using the appropriate language, and know that the shape has not changed"
Geometry - position and direction,"describe position, direction and movement",P2,Year 6,"draw and translate simple shapes on the co-ordinate plane, and reflect them in the axes"
Geometry - position and direction,co-ordinates,P3,Year 1,
Geometry - position and direction,co-ordinates,P3,Year 2,
Geometry - position and direction,co-ordinates,P3,Year 3,
Geometry - position and direction,co-ordinates,P3,Year 4,describe positions on a 2-D grid as co-ordinates in the first quadrant; plot specified points and draw sides to complete a given polygon
Geometry - position and direction,co-ordinates,P3,Year 5,
Geometry - position and direction,co-ordinates,P3,Year 6,describe positions on the full co-ordinate grid (all four quadrants)
Statistics,interpret and represent data,S1,Year 1,
Statistics,interpret and represent data,S1,Year 2,"interpret and construct simple pictograms, tally charts, block diagrams and simple tables"
Statistics,interpret and represent data,S1,Year 3,"interpret and present data using bar charts, pictograms and tables"
Statistics,interpret and represent data,S1,Year 4,"interpret and present discrete and continuous data using appropriate graphical methods, including bar charts and time graphs"
Statistics,interpret and represent data,S1,Year 5,"complete, read and interpret information in tables, including timetables"
Statistics,interpret and represent data,S1,Year 6,interpret and construct pie charts and line graphs and use these to solve problems
Statistics,solve problems involving data,S2,Year 1,
Statistics,solve problems involving data,S2,Year 2,ask and answer simple questions by counting the number of objects in each category and sorting the categories by quantity; ask and answer questions about totalling and comparing categorical data
Statistics,solve problems involving data,S2,Year 3,"solve one-step and two-step questions [e.g. 'How many more?' and 'How many fewer?'] using information presented in scaled bar charts, pictograms and tables"
Statistics,solve problems involving data,S2,Year 4,"solve comparison, sum and difference problems using information presented in bar charts, pictograms, tables and other graphs"
Statistics,solve problems involving data,S2,Year 5,"solve comparison, sum and difference problems using information presented in a line graph"
Statistics,solve problems involving data,S2,Year 6,
Statistics,mean average,S3,Year 1,
Statistics,mean average,S3,Year 2,
Statistics,mean average,S3,Year 3,
Statistics,mean average,S3,Year 4,
Statistics,mean average,S3,Year 5,
Statistics,mean average,S3,Year 6,calculate and interpret the mean as an average

```

---
### `docs\param_demo.tsx`
**Type:** tsx

```tsx
import React, { useState } from 'react';
import { ChevronRight, RefreshCw, Settings, FileText, Zap } from 'lucide-react';

// Sample modules with full parameterization
const MODULES = {
  'Y1_N1_counting': {
    id: 'Y1_N1_counting',
    year: 'Year 1',
    strand: 'Number and place value',
    substrand: 'counting (in multiples)',
    description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
    parameters: {
      min_value: { 1: 0, 2: 0, 3: 0, 4: 0 },
      max_value: { 1: 30, 2: 50, 3: 100, 4: 200 },
      step_sizes: { 1: [1, 2, 5, 10], 2: [1, 2, 5, 10], 3: [1, 2, 5, 10], 4: [1, 2, 3, 5, 10] },
      sequence_length: { 1: 5, 2: 10, 3: 15, 4: 20 },
      directions: { 1: ['forwards'], 2: ['forwards', 'backwards'], 3: ['forwards', 'backwards'], 4: ['forwards', 'backwards'] },
      missing_numbers: { 1: 0, 2: 1, 3: 2, 4: 3 }
    }
  },
  'Y1_C1_bonds': {
    id: 'Y1_C1_bonds',
    year: 'Year 1',
    strand: 'Calculations',
    substrand: 'add / subtract mentally',
    description: 'Represent and use number bonds and related subtraction facts within 20',
    parameters: {
      total_value: { 1: [5, 10], 2: [10], 3: [10, 20], 4: [20] },
      missing_part: { 1: 'second', 2: 'either', 3: 'either', 4: 'any' },
      include_subtraction: { 1: false, 2: true, 3: true, 4: true },
      visual_aids: { 1: 'always', 2: 'often', 3: 'sometimes', 4: 'rarely' },
      time_limit: { 1: 15, 2: 10, 3: 5, 4: 3 },
      questions_per_session: { 1: 5, 2: 8, 3: 10, 4: 15 }
    }
  },
  'Y3_C2_multiply': {
    id: 'Y3_C2_multiply',
    year: 'Year 3',
    strand: 'Calculations',
    substrand: 'recall multiplication facts',
    description: 'Recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables',
    parameters: {
      times_tables: { 1: [2, 5, 10], 2: [2, 3, 4, 5, 10], 3: [3, 4, 8], 4: [3, 4, 6, 7, 8, 9] },
      max_multiplier: { 1: 5, 2: 10, 3: 12, 4: 12 },
      include_division: { 1: false, 2: true, 3: true, 4: true },
      question_types: { 1: ['equation'], 2: ['equation', 'division'], 3: ['equation', 'division', 'missing'], 4: ['all', 'word_problems'] },
      time_limit: { 1: 8, 2: 5, 3: 3, 4: 2 },
      accuracy_target: { 1: 0.70, 2: 0.80, 3: 0.90, 4: 0.95 }
    }
  },
  'Y4_F1_fractions': {
    id: 'Y4_F1_fractions',
    year: 'Year 4',
    strand: 'Fractions, decimals and percentages',
    substrand: 'equivalent fractions',
    description: 'Recognise and show, using diagrams, families of common equivalent fractions',
    parameters: {
      denominators: { 1: [2, 4, 10], 2: [2, 3, 4, 5, 10], 3: [2, 3, 4, 5, 6, 8, 10, 12], 4: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12] },
      equivalences_to_find: { 1: 2, 2: 3, 3: 4, 4: 5 },
      visual_support: { 1: 'always', 2: 'often', 3: 'sometimes', 4: 'rarely' },
      simplification_required: { 1: false, 2: false, 3: true, 4: true },
      fraction_types: { 1: ['proper'], 2: ['proper', 'unit'], 3: ['proper', 'improper'], 4: ['proper', 'improper', 'mixed'] }
    }
  }
};

// Question generators for each module type
const generateQuestions = (moduleId, level, count = 3) => {
  const module = MODULES[moduleId];
  const params = module.parameters;
  const questions = [];

  if (moduleId === 'Y1_N1_counting') {
    for (let i = 0; i < count; i++) {
      const steps = params.step_sizes[level];
      const step = steps[Math.floor(Math.random() * steps.length)];
      const direction = params.directions[level][Math.floor(Math.random() * params.directions[level].length)];
      const maxVal = params.max_value[level];
      const seqLen = params.sequence_length[level];
      const missing = params.missing_numbers[level];
      
      let start = Math.floor(Math.random() * (maxVal / 2));
      start = Math.floor(start / step) * step;
      
      let sequence = [];
      for (let j = 0; j < seqLen; j++) {
        if (direction === 'forwards') {
          sequence.push(start + (j * step));
        } else {
          sequence.push(start - (j * step));
        }
      }
      
      let displaySeq = [...sequence];
      if (missing > 0) {
        const positions = [];
        for (let j = 2; j < seqLen; j++) {
          if (Math.random() > 0.5 && positions.length < missing) {
            positions.push(j);
          }
        }
        positions.forEach(pos => displaySeq[pos] = '_');
      }
      
      questions.push({
        text: `Continue the sequence: ${displaySeq.join(', ')}`,
        answer: sequence.join(', '),
        type: 'sequence'
      });
    }
  } else if (moduleId === 'Y1_C1_bonds') {
    for (let i = 0; i < count; i++) {
      const totals = params.total_value[level];
      const total = totals[Math.floor(Math.random() * totals.length)];
      const part1 = Math.floor(Math.random() * (total + 1));
      const part2 = total - part1;
      
      const includeSubtraction = params.include_subtraction[level];
      const isSubtraction = includeSubtraction && Math.random() > 0.5;
      
      if (isSubtraction) {
        questions.push({
          text: `${total} - ${part1} = ?`,
          answer: part2.toString(),
          type: 'subtraction'
        });
      } else {
        const missingPart = params.missing_part[level];
        if (missingPart === 'second' || (missingPart === 'either' && Math.random() > 0.5)) {
          questions.push({
            text: `${part1} + ? = ${total}`,
            answer: part2.toString(),
            type: 'addition'
          });
        } else {
          questions.push({
            text: `? + ${part2} = ${total}`,
            answer: part1.toString(),
            type: 'addition'
          });
        }
      }
    }
  } else if (moduleId === 'Y3_C2_multiply') {
    for (let i = 0; i < count; i++) {
      const tables = params.times_tables[level];
      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = Math.floor(Math.random() * params.max_multiplier[level]) + 1;
      const product = table * multiplier;
      
      const types = params.question_types[level];
      const type = types[Math.floor(Math.random() * types.length)];
      
      if (type === 'division' && params.include_division[level]) {
        questions.push({
          text: `${product} ÷ ${table} = ?`,
          answer: multiplier.toString(),
          type: 'division'
        });
      } else if (type === 'missing') {
        questions.push({
          text: `${table} × ? = ${product}`,
          answer: multiplier.toString(),
          type: 'missing'
        });
      } else {
        questions.push({
          text: `${table} × ${multiplier} = ?`,
          answer: product.toString(),
          type: 'multiplication'
        });
      }
    }
  } else if (moduleId === 'Y4_F1_fractions') {
    for (let i = 0; i < count; i++) {
      const denoms = params.denominators[level];
      const denom1 = denoms[Math.floor(Math.random() * denoms.length)];
      
      // Find equivalent fraction
      const multiplier = Math.floor(Math.random() * 3) + 2;
      const denom2 = denom1 * multiplier;
      const num1 = Math.floor(Math.random() * denom1) + 1;
      const num2 = num1 * multiplier;
      
      questions.push({
        text: `${num1}/${denom1} = ?/${denom2}`,
        answer: `${num2}/${denom2}`,
        type: 'equivalent'
      });
    }
  }
  
  return questions;
};

export default function CurriculumDemo() {
  const [selectedModule, setSelectedModule] = useState('Y1_N1_counting');
  const [difficultyLevel, setDifficultyLevel] = useState(3);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [showParameters, setShowParameters] = useState(true);

  const currentModule = MODULES[selectedModule];
  const currentParams = currentModule.parameters;

  const handleGenerateQuestions = () => {
    const questions = generateQuestions(selectedModule, difficultyLevel, 5);
    setGeneratedQuestions(questions);
  };

  const getLevelName = (level) => {
    const names = { 1: 'Beginning', 2: 'Developing', 3: 'Meeting', 4: 'Exceeding' };
    return names[level];
  };

  const getLevelColor = (level) => {
    const colors = {
      1: 'bg-green-100 text-green-800 border-green-300',
      2: 'bg-blue-100 text-blue-800 border-blue-300',
      3: 'bg-purple-100 text-purple-800 border-purple-300',
      4: 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[level];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Curriculum Parameter System Demo
          </h1>
          <p className="text-gray-600">
            See how parameters control question difficulty and generate actual questions
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Module Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Select Module</h2>
              </div>
              
              <div className="space-y-2">
                {Object.entries(MODULES).map(([id, module]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedModule(id);
                      setGeneratedQuestions([]);
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedModule === id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-gray-900">
                      {module.year} - {module.strand}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {module.substrand}
                    </div>
                  </button>
                ))}
              </div>

              {/* Difficulty Level Selector */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Difficulty Level</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setDifficultyLevel(level);
                        setGeneratedQuestions([]);
                      }}
                      className={`w-full p-3 rounded-lg border-2 font-medium transition-all ${
                        difficultyLevel === level
                          ? getLevelColor(level)
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Level {level}: {getLevelName(level)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Panel - Parameters & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Module Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentModule.year}: {currentModule.strand}
              </h2>
              <p className="text-gray-700 mb-3">
                {currentModule.description}
              </p>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {currentModule.substrand}
              </div>
            </div>

            {/* Parameters Display */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Parameters for Level {difficultyLevel}
                  </h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(difficultyLevel)}`}>
                  {getLevelName(difficultyLevel)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(currentParams).map(([param, values]) => {
                  const currentValue = values[difficultyLevel];
                  const allValues = [values[1], values[2], values[3], values[4]];
                  
                  return (
                    <div key={param} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="font-semibold text-sm text-gray-700 mb-2">
                        {param.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div className="text-lg font-bold text-indigo-600 mb-2">
                        {Array.isArray(currentValue) 
                          ? currentValue.join(', ')
                          : typeof currentValue === 'boolean'
                          ? (currentValue ? 'Yes' : 'No')
                          : currentValue}
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Level 1: {Array.isArray(allValues[0]) ? allValues[0].join(', ') : String(allValues[0])}</div>
                        <div>Level 2: {Array.isArray(allValues[1]) ? allValues[1].join(', ') : String(allValues[1])}</div>
                        <div>Level 3: {Array.isArray(allValues[2]) ? allValues[2].join(', ') : String(allValues[2])}</div>
                        <div>Level 4: {Array.isArray(allValues[3]) ? allValues[3].join(', ') : String(allValues[3])}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question Generator */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Generate Questions</h2>
              </div>

              <button
                onClick={handleGenerateQuestions}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Generate 5 Questions at Level {difficultyLevel}
              </button>

              {generatedQuestions.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-gray-900">Generated Questions:</h3>
                  {generatedQuestions.map((q, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r">
                      <div className="font-medium text-gray-900 mb-1">
                        Question {idx + 1}: {q.text}
                      </div>
                      <div className="text-sm text-gray-600">
                        Answer: <span className="font-semibold text-indigo-600">{q.answer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border border-indigo-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-indigo-600" />
                How This Works in Practice
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>1. Select a module</strong> from your curriculum</p>
                <p><strong>2. Choose difficulty level</strong> (1-4) based on student ability</p>
                <p><strong>3. Parameters automatically adjust</strong> to control question complexity</p>
                <p><strong>4. Generate questions</strong> that match the exact difficulty level</p>
                <p><strong>5. Track student progress</strong> and adjust levels as they improve</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 mb-1">Precise Differentiation</div>
              <div className="text-sm text-green-700">Every student gets questions at exactly the right difficulty</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1">Unlimited Questions</div>
              <div className="text-sm text-blue-700">Generate as many practice questions as needed using the same parameters</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-900 mb-1">Clear Progression</div>
              <div className="text-sm text-purple-700">Track student movement through difficulty levels with consistent criteria</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---
### `index.html`
**Type:** html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <meta name="description" content="Interactive mathematics practice for UK Key Stage 1 & 2 students">
    <meta name="theme-color" content="#2563eb">
    <title>Maths Practice - UK Key Stage 1 & 2</title>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/screens.css">
    <link rel="stylesheet" href="styles/keyboard.css">
    <link rel="stylesheet" href="styles/powerup.css">
    <link rel="stylesheet" href="styles/completion.css">
    <link rel="stylesheet" href="styles/progress.css">
    <link rel="stylesheet" href="styles/adaptive.css">
    <link rel="stylesheet" href="styles/responsive.css">

    <!-- Favicon (optional) -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
</head>
<body>
    <div class="app-container">
        <!-- Setup Screen -->
        <div id="setupScreen" class="screen">
            <!-- Content will be injected by JavaScript -->
        </div>

        <!-- Practice Screen -->
        <div id="practiceScreen" class="screen hidden">
            <!-- Content will be injected by JavaScript -->
        </div>

        <!-- Results Screen -->
        <div id="resultsScreen" class="screen hidden">
            <!-- Content will be injected by JavaScript -->
        </div>
    </div>

    <!-- Application JavaScript (ES6 Modules) -->
    <script type="module" src="src/ui/app.js"></script>
</body>
</html>

```

---
### `PHONE_INSTRUCTIONSmd`
**Type:** unknown

```unknown
Sure — here’s a concise Windows-specific version in **Markdown**:

````markdown
## Access Your Local `http-server` from Your Phone (Windows)

1. **Find Your IP Address**
   - Open PowerShell and run:
     ```bash
     ipconfig
     ```
   - Note your **IPv4 Address** (e.g. `192.168.1.5`).
   - Actual address: `192.168.68.71`

2. **Start the Server**
   ```bash
   npx http-server -p 8000
````

3. **Allow Firewall Access**

   * If prompted, click **Allow access** for private networks.

4. **Open on Your Phone**

   * Connect your phone to the **same Wi-Fi**.
   * Open a browser and visit:

     ```
     http://192.168.68.71:8000
     ```

     *(Use your own IP address from step 1.)*

```
```

```

---
### `src\core\adaptiveDifficultyEngine.js`
**Type:** js

```js
/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * AdaptiveDifficultyEngine - Core decision-making system for adaptive learning
 *
 * Responsibilities:
 * - Calculate confidence score (0-100) based on weighted performance factors
 * - Determine intervention triggers
 * - Generate difficulty adjustment recommendations
 * - Provide child-friendly messaging
 *
 * Uses data from PerformanceAnalyzer to make real-time decisions during sessions.
 *
 * Educational Foundation: Zone of Proximal Development (ZPD)
 * - Optimal learning happens when difficulty is challenging but achievable
 * - Too easy → boredom, no growth
 * - Too hard → frustration, disengagement
 * - Just right (65-85% confidence) → optimal learning
 */

import performanceAnalyzer from './performanceAnalyzer.js';

class AdaptiveDifficultyEngine {
  constructor() {
    // Intervention settings
    this.enabled = true; // Can be toggled by teacher/settings
    this.interventionCheckpoints = [5, 10, 15, 20]; // Question numbers to check
    this.maxInterventionsPerSession = 1; // Limit to avoid disruption
    this.interventionsMadeThisSession = 0;

    // Confidence score weights (must sum to 100)
    this.weights = {
      accuracy: 35,      // Primary indicator of understanding
      responseTime: 15,  // Speed indicates fluency
      hints: 20,         // Future: hint usage indicates support needed
      consistency: 15,   // Stable performance vs erratic
      streak: 15         // Ability to maintain correct answers
    };

    // Trigger thresholds
    this.triggers = {
      critical: { max: 30, label: 'Critical', color: 'red' },
      struggling: { min: 30, max: 40, label: 'Struggling', color: 'orange' },
      challenging: { min: 40, max: 65, label: 'Challenging', color: 'amber' },
      optimal: { min: 65, max: 85, label: 'Optimal', color: 'green' },
      excelling: { min: 85, label: 'Excelling', color: 'blue' }
    };

    console.log('🎯 AdaptiveDifficultyEngine: Initialized');
  }

  /**
   * Reset for new session
   */
  resetSession() {
    this.interventionsMadeThisSession = 0;
    console.log('🎯 AdaptiveDifficultyEngine: Reset for new session');
  }

  /**
   * Calculate confidence score (0-100)
   * Higher score = student is more confident/finding it easy
   * Lower score = student is struggling
   *
   * @returns {Object} Confidence score and breakdown
   */
  calculateConfidenceScore() {
    const metrics = performanceAnalyzer.getMetrics();

    // Need sufficient data
    if (!performanceAnalyzer.hasEnoughData(5)) {
      return {
        score: null,
        level: 'insufficient_data',
        breakdown: null,
        message: 'Not enough questions answered yet'
      };
    }

    // Factor 1: Accuracy (35% weight)
    // Use rolling accuracy for recent performance
    const accuracyScore = metrics.rollingAccuracy; // Already 0-100

    // Factor 2: Response Time (15% weight)
    // Compare to expected time for level
    const avgTime = metrics.rollingAverageResponseTime;
    const expectedTime = metrics.expectedResponseTime;

    let responseTimeScore = 50; // Default neutral
    if (avgTime === 0) {
      responseTimeScore = 50; // No data
    } else if (avgTime < expectedTime * 0.7) {
      // Very fast (< 70% expected) → high confidence
      responseTimeScore = 90;
    } else if (avgTime < expectedTime) {
      // Faster than expected → good confidence
      responseTimeScore = 75;
    } else if (avgTime <= expectedTime * 1.5) {
      // Within reasonable range → moderate
      responseTimeScore = 50;
    } else if (avgTime <= expectedTime * 2) {
      // Slow but thinking → lower confidence
      responseTimeScore = 30;
    } else {
      // Very slow → struggling
      responseTimeScore = 15;
    }

    // Factor 3: Hints (20% weight)
    // Placeholder for Phase 6: Hints System
    // For now, assume no hints used = high score
    const hintsScore = 100; // TODO: Implement when hints system is added

    // Factor 4: Consistency (15% weight)
    // Measure stability of performance (low streak breaks = consistent)
    const streakBreakRate = metrics.totalQuestions > 0
      ? (metrics.streakBreaks / metrics.totalQuestions)
      : 0;

    let consistencyScore = 50;
    if (streakBreakRate === 0) {
      consistencyScore = 100; // Perfect consistency
    } else if (streakBreakRate < 0.2) {
      consistencyScore = 80; // High consistency
    } else if (streakBreakRate < 0.4) {
      consistencyScore = 60; // Moderate consistency
    } else if (streakBreakRate < 0.6) {
      consistencyScore = 40; // Inconsistent
    } else {
      consistencyScore = 20; // Very inconsistent
    }

    // Factor 5: Streak (15% weight)
    // Current streak indicates momentum
    const currentStreak = metrics.currentStreak;
    const consecutiveErrors = metrics.consecutiveErrors;

    let streakScore = 50; // Neutral
    if (currentStreak >= 5) {
      streakScore = 100; // Excellent streak
    } else if (currentStreak >= 3) {
      streakScore = 85; // Good streak
    } else if (currentStreak >= 2) {
      streakScore = 70; // Building momentum
    } else if (currentStreak === 1) {
      streakScore = 55; // Just started
    } else if (consecutiveErrors >= 3) {
      streakScore = 15; // Error streak - very low
    } else if (consecutiveErrors >= 2) {
      streakScore = 30; // Losing momentum
    }

    // Calculate weighted confidence score
    const confidenceScore = Math.round(
      (accuracyScore * this.weights.accuracy / 100) +
      (responseTimeScore * this.weights.responseTime / 100) +
      (hintsScore * this.weights.hints / 100) +
      (consistencyScore * this.weights.consistency / 100) +
      (streakScore * this.weights.streak / 100)
    );

    // Determine confidence level
    const level = this.getConfidenceLevel(confidenceScore);

    return {
      score: confidenceScore,
      level: level.label,
      color: level.color,
      breakdown: {
        accuracy: { score: Math.round(accuracyScore), weight: this.weights.accuracy },
        responseTime: { score: Math.round(responseTimeScore), weight: this.weights.responseTime },
        hints: { score: Math.round(hintsScore), weight: this.weights.hints },
        consistency: { score: Math.round(consistencyScore), weight: this.weights.consistency },
        streak: { score: Math.round(streakScore), weight: this.weights.streak }
      },
      message: this.getConfidenceMessage(confidenceScore, level.label)
    };
  }

  /**
   * Determine confidence level from score
   * @param {number} score - Confidence score (0-100)
   * @returns {Object} Level info
   */
  getConfidenceLevel(score) {
    if (score < this.triggers.critical.max) {
      return this.triggers.critical;
    }
    if (score >= this.triggers.struggling.min && score < this.triggers.struggling.max) {
      return this.triggers.struggling;
    }
    if (score >= this.triggers.challenging.min && score < this.triggers.challenging.max) {
      return this.triggers.challenging;
    }
    if (score >= this.triggers.optimal.min && score < this.triggers.optimal.max) {
      return this.triggers.optimal;
    }
    return this.triggers.excelling;
  }

  /**
   * Get child-friendly message for confidence level
   * @param {number} score - Confidence score
   * @param {string} level - Confidence level label
   * @returns {string} Message
   */
  getConfidenceMessage(score, level) {
    const messages = {
      critical: "These questions are very tricky. Let's try something easier!",
      struggling: "These questions are tough. Would you like to try an easier level?",
      challenging: "You're working hard! Keep going!",
      optimal: "Great job! You're learning well at this level!",
      excelling: "You're doing brilliantly! Ready for a bigger challenge?"
    };

    return messages[level.toLowerCase()] || "Keep up the good work!";
  }

  /**
   * Check if intervention should be triggered
   * @param {number} questionNumber - Current question number (1-based)
   * @returns {Object|null} Intervention recommendation or null
   */
  checkForIntervention(questionNumber) {
    // Check 1: Is adaptive engine enabled?
    if (!this.enabled) {
      return null;
    }

    // Check 2: Is this a checkpoint?
    if (!this.interventionCheckpoints.includes(questionNumber)) {
      return null;
    }

    // Check 3: Have we already intervened this session?
    if (this.interventionsMadeThisSession >= this.maxInterventionsPerSession) {
      console.log(`🎯 AdaptiveDifficultyEngine: Max interventions (${this.maxInterventionsPerSession}) reached for this session`);
      return null;
    }

    // Check 4: Do we have enough data?
    if (!performanceAnalyzer.hasEnoughData(5)) {
      return null;
    }

    // Calculate confidence
    const confidence = this.calculateConfidenceScore();

    if (!confidence.score) {
      return null;
    }

    console.log(`🎯 AdaptiveDifficultyEngine: Q${questionNumber} checkpoint - Confidence: ${confidence.score} (${confidence.level})`);

    // Check 5: Should we intervene based on confidence level?
    const currentLevel = performanceAnalyzer.getMetrics().level;

    // Critical or Struggling → Suggest easier
    if (confidence.level === 'Critical' || confidence.level === 'Struggling') {
      if (currentLevel > 1) {
        return this.createIntervention('decrease', confidence, questionNumber);
      } else {
        // Already at easiest level, suggest different module
        return this.createIntervention('switch_module', confidence, questionNumber);
      }
    }

    // Excelling → Suggest harder
    if (confidence.level === 'Excelling') {
      if (currentLevel < 4) {
        return this.createIntervention('increase', confidence, questionNumber);
      } else {
        // Already at hardest level
        return null; // No intervention needed
      }
    }

    // Optimal or Challenging → No intervention needed (ZPD)
    return null;
  }

  /**
   * Create intervention recommendation
   * @param {string} type - Intervention type (decrease|increase|switch_module)
   * @param {Object} confidence - Confidence data
   * @param {number} questionNumber - Current question number
   * @returns {Object} Intervention object
   */
  createIntervention(type, confidence, questionNumber) {
    const currentLevel = performanceAnalyzer.getMetrics().level;
    const moduleId = performanceAnalyzer.getMetrics().moduleId;

    let intervention = {
      type,
      triggeredAt: questionNumber,
      confidence,
      currentLevel,
      moduleId,
      timestamp: Date.now()
    };

    switch (type) {
      case 'decrease':
        intervention.suggestedLevel = currentLevel - 1;
        intervention.reason = 'Student is struggling at current level';
        intervention.title = "Let's Make It Easier";
        intervention.message = confidence.level === 'Critical'
          ? "These questions are very challenging for you right now. Let's try an easier level where you can build your confidence!"
          : "You're working really hard! Let's try an easier level to help you feel more confident.";
        intervention.primaryAction = "Try Easier Level";
        intervention.secondaryAction = "Keep Trying This Level";
        break;

      case 'increase':
        intervention.suggestedLevel = currentLevel + 1;
        intervention.reason = 'Student is excelling at current level';
        intervention.title = "Ready for a Challenge?";
        intervention.message = "You're doing brilliantly! These questions seem easy for you. Would you like to try a harder level?";
        intervention.primaryAction = "Try Harder Level";
        intervention.secondaryAction = "Stay at This Level";
        break;

      case 'switch_module':
        intervention.suggestedLevel = null;
        intervention.reason = 'Student struggling at easiest level';
        intervention.title = "Let's Try Something Different";
        intervention.message = "These questions are tricky. Would you like to try a different type of maths practice?";
        intervention.primaryAction = "Choose Different Module";
        intervention.secondaryAction = "Keep Practicing";
        break;
    }

    console.log(`🎯 AdaptiveDifficultyEngine: Intervention created - ${type} (L${currentLevel} → L${intervention.suggestedLevel || '?'})`);

    return intervention;
  }

  /**
   * Record that intervention was shown to student
   */
  recordInterventionShown() {
    this.interventionsMadeThisSession++;
    console.log(`🎯 AdaptiveDifficultyEngine: Intervention shown (${this.interventionsMadeThisSession}/${this.maxInterventionsPerSession})`);
  }

  /**
   * Record student's response to intervention
   * @param {Object} intervention - Intervention object
   * @param {boolean} accepted - Whether student accepted suggestion
   */
  recordInterventionResponse(intervention, accepted) {
    console.log(`🎯 AdaptiveDifficultyEngine: Intervention ${accepted ? 'ACCEPTED' : 'DECLINED'} - ${intervention.type}`);

    // Future: Store in storageManager for learning patterns
    // This data can be used to:
    // - Learn student's preferences
    // - Adjust intervention timing/frequency
    // - Improve recommendation accuracy

    return {
      intervention,
      accepted,
      timestamp: Date.now()
    };
  }

  /**
   * Get recommendation for next session (used on setup screen)
   * Based on student's historical performance from storageManager
   *
   * @param {string} studentId - Student ID
   * @param {string} moduleId - Module ID
   * @returns {Object|null} Recommendation or null
   */
  getRecommendationForNextSession(studentId, moduleId) {
    // This method works with storageManager to analyze historical data
    // and suggest a starting level for the next session

    // For now, return null - will implement when storageManager is extended
    // TODO: Implement in Week 2 when difficultyMatrix and storageManager are ready
    return null;
  }

  /**
   * Enable or disable adaptive system
   * @param {boolean} enabled - Enable state
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    console.log(`🎯 AdaptiveDifficultyEngine: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  /**
   * Check if adaptive system is enabled
   * @returns {boolean}
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Get current session intervention count
   * @returns {number}
   */
  getInterventionCount() {
    return this.interventionsMadeThisSession;
  }

  /**
   * Get configuration info
   * @returns {Object}
   */
  getConfig() {
    return {
      enabled: this.enabled,
      checkpoints: this.interventionCheckpoints,
      maxInterventions: this.maxInterventionsPerSession,
      weights: this.weights,
      triggers: this.triggers
    };
  }
}

// Export singleton instance
const adaptiveDifficultyEngine = new AdaptiveDifficultyEngine();
export default adaptiveDifficultyEngine;

```

---
### `src\core\difficultyMatrix.js`
**Type:** js

```js
/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * DifficultyMatrix - Cross-module difficulty mapping and recovery paths
 *
 * Maps equivalent difficulty levels across different modules and provides
 * intelligent recovery paths for struggling students.
 *
 * Educational Insight:
 * - Not all Level 1s are equal in difficulty
 * - Some modules build on skills from other modules
 * - Students struggling in one module may benefit from building
 *   foundational skills in a related but easier module
 *
 * Example:
 * - Student struggling at Fractions L1 → Suggest Bonds L1 (foundational)
 * - Student struggling at Multiply L2 → Suggest Counting L2 (related skill)
 */

/**
 * Difficulty ratings for each module at each level (1-10 scale)
 * Higher number = more difficult
 *
 * Based on UK Key Stage 1 & 2 curriculum expectations
 */
const DIFFICULTY_RATINGS = {
  counting: {
    1: 2,  // Very accessible (counting forward in small steps)
    2: 4,  // Basic (larger steps, backward counting)
    3: 5,  // Moderate (negative numbers, decimal steps)
    4: 7   // Advanced (complex patterns, fractions)
  },
  bonds: {
    1: 3,  // Accessible but requires understanding of addition/subtraction
    2: 5,  // Moderate (bonds to 10, 20)
    3: 6,  // Moderate-Advanced (bonds to 100, multiple strategies)
    4: 8   // Advanced (rapid recall, large numbers)
  },
  multiply: {
    1: 4,  // Moderate (requires counting knowledge, times tables)
    2: 6,  // Moderate-Advanced (larger tables, division)
    3: 7,  // Advanced (multi-digit, mental strategies)
    4: 9   // Very Advanced (complex problems, fluency)
  },
  fractions: {
    1: 5,  // Moderate (abstract concept, visualization needed)
    2: 7,  // Advanced (operations with fractions)
    3: 8,  // Very Advanced (mixed numbers, equivalence)
    4: 9   // Very Advanced (complex operations)
  }
};

/**
 * Module dependencies and prerequisite skills
 * Key: Module that requires skills
 * Value: Array of prerequisite modules (easier to harder)
 */
const MODULE_DEPENDENCIES = {
  counting: [],  // Foundational module, no prerequisites
  bonds: ['counting'],  // Requires counting skills
  multiply: ['counting', 'bonds'],  // Requires both counting and addition
  fractions: ['counting', 'bonds', 'multiply']  // Requires all other modules
};

/**
 * Recovery paths for each module
 * When student struggles, suggest these alternative modules
 * Ordered from most helpful to least helpful
 */
const RECOVERY_PATHS = {
  counting: {
    // Counting is foundational, no easier module
    // Suggest different practice strategies instead
    alternatives: [],
    strategy: 'simplify' // Simplify current level parameters
  },
  bonds: {
    // If struggling with bonds, build counting fluency first
    alternatives: ['counting'],
    strategy: 'prerequisite'
  },
  multiply: {
    // If struggling with multiplication, strengthen bonds/counting
    alternatives: ['bonds', 'counting'],
    strategy: 'prerequisite'
  },
  fractions: {
    // If struggling with fractions, strengthen all foundational skills
    alternatives: ['bonds', 'multiply', 'counting'],
    strategy: 'prerequisite'
  }
};

/**
 * Skill connections between modules
 * Used to suggest "lateral moves" (same difficulty, different module)
 */
const SKILL_CONNECTIONS = {
  counting: {
    related: ['bonds'], // Counting patterns relate to number bonds
    reason: 'Understanding number patterns helps with number relationships'
  },
  bonds: {
    related: ['counting', 'multiply'],
    reason: 'Number bonds are the foundation for multiplication'
  },
  multiply: {
    related: ['bonds'],
    reason: 'Multiplication is repeated addition'
  },
  fractions: {
    related: ['bonds', 'multiply'],
    reason: 'Fractions involve division and part-whole relationships'
  }
};

class DifficultyMatrix {
  constructor() {
    console.log('🗺️ DifficultyMatrix: Initialized');
  }

  /**
   * Get difficulty rating for a module at a specific level
   * @param {string} moduleId - Module ID
   * @param {number} level - Level (1-4)
   * @returns {number} Difficulty rating (1-10)
   */
  getDifficultyRating(moduleId, level) {
    return DIFFICULTY_RATINGS[moduleId]?.[level] || 5;
  }

  /**
   * Find modules at equivalent difficulty level
   * @param {string} currentModule - Current module ID
   * @param {number} currentLevel - Current level
   * @param {number} tolerance - Difficulty tolerance (default 1)
   * @returns {Array} Array of {moduleId, level, difficulty} objects
   */
  findEquivalentDifficulty(currentModule, currentLevel, tolerance = 1) {
    const currentDifficulty = this.getDifficultyRating(currentModule, currentLevel);
    const equivalents = [];

    // Check all modules and levels
    Object.keys(DIFFICULTY_RATINGS).forEach(moduleId => {
      // Skip current module
      if (moduleId === currentModule) return;

      [1, 2, 3, 4].forEach(level => {
        const difficulty = this.getDifficultyRating(moduleId, level);

        // Check if within tolerance
        if (Math.abs(difficulty - currentDifficulty) <= tolerance) {
          equivalents.push({
            moduleId,
            level,
            difficulty,
            difference: difficulty - currentDifficulty
          });
        }
      });
    });

    // Sort by difficulty (closest match first)
    equivalents.sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));

    return equivalents;
  }

  /**
   * Get recovery path for a struggling student
   * Returns suggested modules to build prerequisite skills
   *
   * @param {string} moduleId - Module where student is struggling
   * @param {number} level - Level where student is struggling
   * @returns {Object} Recovery path recommendation
   */
  getRecoveryPath(moduleId, level) {
    const recoveryConfig = RECOVERY_PATHS[moduleId];

    if (!recoveryConfig) {
      return {
        moduleId,
        level,
        hasPath: false,
        strategy: 'persist',
        message: 'Keep practicing at this level'
      };
    }

    // If struggling at Level 1, suggest prerequisite modules
    if (level === 1 && recoveryConfig.alternatives.length > 0) {
      const suggestions = recoveryConfig.alternatives.map(altModule => {
        // Suggest same level or one level down in prerequisite module
        const suggestedLevel = Math.max(1, level);

        return {
          moduleId: altModule,
          level: suggestedLevel,
          difficulty: this.getDifficultyRating(altModule, suggestedLevel),
          reason: `Build foundational ${altModule} skills first`
        };
      });

      return {
        moduleId,
        level,
        hasPath: true,
        strategy: recoveryConfig.strategy,
        suggestions,
        message: `Try building foundational skills in ${suggestions[0].moduleId} first`
      };
    }

    // If struggling at Level 2+, suggest lower level in same module first
    if (level > 1) {
      return {
        moduleId,
        level,
        hasPath: true,
        strategy: 'step_down',
        suggestions: [{
          moduleId,
          level: level - 1,
          difficulty: this.getDifficultyRating(moduleId, level - 1),
          reason: 'Strengthen skills at easier level'
        }],
        message: `Try Level ${level - 1} in this module first`
      };
    }

    // No recovery path needed
    return {
      moduleId,
      level,
      hasPath: false,
      strategy: 'simplify',
      message: 'Continue practicing at this level'
    };
  }

  /**
   * Get prerequisite modules for a module
   * @param {string} moduleId - Module ID
   * @returns {Array} Array of prerequisite module IDs
   */
  getPrerequisites(moduleId) {
    return MODULE_DEPENDENCIES[moduleId] || [];
  }

  /**
   * Get skill connections for lateral moves
   * @param {string} moduleId - Module ID
   * @returns {Object} Related modules and reasoning
   */
  getSkillConnections(moduleId) {
    return SKILL_CONNECTIONS[moduleId] || { related: [], reason: '' };
  }

  /**
   * Suggest alternative practice when student is struggling
   * Combines recovery paths with skill connections
   *
   * @param {string} moduleId - Current module
   * @param {number} level - Current level
   * @param {string} reason - Why alternative is needed ('struggling' | 'bored' | 'variety')
   * @returns {Object} Suggestion object
   */
  suggestAlternative(moduleId, level, reason = 'struggling') {
    if (reason === 'struggling') {
      // Use recovery path
      const recovery = this.getRecoveryPath(moduleId, level);

      if (recovery.hasPath && recovery.suggestions.length > 0) {
        const top = recovery.suggestions[0];
        return {
          type: 'recovery',
          moduleId: top.moduleId,
          level: top.level,
          reason: top.reason,
          message: recovery.message,
          originalModule: moduleId,
          originalLevel: level
        };
      }

      // If no recovery path, suggest lower level
      if (level > 1) {
        return {
          type: 'step_down',
          moduleId,
          level: level - 1,
          reason: 'Build confidence at easier level',
          message: `Try Level ${level - 1} first`,
          originalModule: moduleId,
          originalLevel: level
        };
      }

      // Already at easiest, no prerequisites
      return null;
    }

    if (reason === 'bored' || reason === 'variety') {
      // Suggest lateral move (equivalent difficulty, different module)
      const equivalents = this.findEquivalentDifficulty(moduleId, level, 1);

      if (equivalents.length > 0) {
        const suggestion = equivalents[0];
        return {
          type: 'lateral',
          moduleId: suggestion.moduleId,
          level: suggestion.level,
          reason: 'Try a different type of challenge',
          message: `You might enjoy ${suggestion.moduleId} at Level ${suggestion.level}`,
          originalModule: moduleId,
          originalLevel: level
        };
      }
    }

    return null;
  }

  /**
   * Check if student has completed prerequisites for a module
   * @param {Object} studentProgress - Student's module progress
   * @param {string} targetModule - Module to check
   * @returns {Object} Prerequisite status
   */
  checkPrerequisites(studentProgress, targetModule) {
    const prerequisites = this.getPrerequisites(targetModule);

    if (prerequisites.length === 0) {
      return {
        ready: true,
        missing: [],
        message: 'No prerequisites required'
      };
    }

    const missing = prerequisites.filter(prereqModule => {
      // Check if student has completed prerequisite module
      const progress = studentProgress[prereqModule];
      return !progress || !progress.completed;
    });

    return {
      ready: missing.length === 0,
      missing,
      message: missing.length > 0
        ? `Consider completing ${missing.join(', ')} first`
        : 'Prerequisites completed'
    };
  }

  /**
   * Get progression pathway for a student
   * Suggests next logical module based on completed work
   *
   * @param {Object} studentProgress - Student's module progress
   * @returns {Object} Progression suggestion
   */
  getProgressionPath(studentProgress) {
    // Order of typical curriculum progression
    const progressionOrder = ['counting', 'bonds', 'multiply', 'fractions'];

    // Find first incomplete module
    for (const moduleId of progressionOrder) {
      const progress = studentProgress[moduleId];

      if (!progress || !progress.completed) {
        // Check if prerequisites are met
        const prereqCheck = this.checkPrerequisites(studentProgress, moduleId);

        if (prereqCheck.ready) {
          return {
            moduleId,
            reason: 'Next in curriculum progression',
            message: `Ready to practice ${moduleId}`,
            prerequisites: this.getPrerequisites(moduleId)
          };
        } else {
          return {
            moduleId: prereqCheck.missing[0],
            reason: `Prerequisite for ${moduleId}`,
            message: `Complete ${prereqCheck.missing[0]} before ${moduleId}`,
            prerequisites: []
          };
        }
      }
    }

    // All modules completed
    return {
      moduleId: null,
      reason: 'All modules completed',
      message: 'Congratulations! All modules completed. Try harder levels!',
      prerequisites: []
    };
  }

  /**
   * Get visual difficulty map for debugging/display
   * @returns {Object} Formatted difficulty map
   */
  getDifficultyMap() {
    const map = {};

    Object.keys(DIFFICULTY_RATINGS).forEach(moduleId => {
      map[moduleId] = {};
      [1, 2, 3, 4].forEach(level => {
        const difficulty = this.getDifficultyRating(moduleId, level);
        map[moduleId][`L${level}`] = {
          difficulty,
          label: this.getDifficultyLabel(difficulty)
        };
      });
    });

    return map;
  }

  /**
   * Get difficulty label for rating
   * @param {number} rating - Difficulty rating (1-10)
   * @returns {string} Label
   */
  getDifficultyLabel(rating) {
    if (rating <= 2) return 'Very Easy';
    if (rating <= 4) return 'Easy';
    if (rating <= 6) return 'Moderate';
    if (rating <= 8) return 'Hard';
    return 'Very Hard';
  }
}

// Export singleton instance
const difficultyMatrix = new DifficultyMatrix();
export default difficultyMatrix;

```

---
### `src\core\moduleProgress.js`
**Type:** js

```js
/**
 * Module Progress Tracker
 *
 * Tracks student progress across all modules and difficulty levels.
 * Detects module completion when student answers 3+ questions correctly at each level.
 * Part of Phase 3.5: Module Completion System
 */

class ModuleProgress {
    constructor() {
        this.storageKey = 'mathsPractice_moduleProgress';
        this.data = this.load();
    }

    /**
     * Initialize module data if it doesn't exist
     * @param {string} moduleId - Module identifier
     */
    initModule(moduleId) {
        if (!this.data[moduleId]) {
            this.data[moduleId] = {
                level1Correct: 0,
                level2Correct: 0,
                level3Correct: 0,
                level4Correct: 0,
                completed: false,
                completedDate: null
            };
        }
    }

    /**
     * Record a correct answer for a specific module and level
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     */
    recordCorrectAnswer(moduleId, level) {
        this.initModule(moduleId);

        const levelKey = `level${level}Correct`;
        this.data[moduleId][levelKey]++;

        this.save();
    }

    /**
     * Get progress data for a specific module
     * @param {string} moduleId - Module identifier
     * @returns {Object} Module progress data
     */
    getProgress(moduleId) {
        this.initModule(moduleId);
        return { ...this.data[moduleId] };
    }

    /**
     * Check if a specific level has been completed (3+ correct)
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @returns {boolean} True if level has 3+ correct answers
     */
    isLevelComplete(moduleId, level) {
        const progress = this.getProgress(moduleId);
        const levelKey = `level${level}Correct`;
        return progress[levelKey] >= 3;
    }

    /**
     * Check if all 4 levels of a module have been completed
     * @param {string} moduleId - Module identifier
     * @returns {boolean} True if all levels have 3+ correct answers
     */
    isModuleComplete(moduleId) {
        return this.isLevelComplete(moduleId, 1) &&
               this.isLevelComplete(moduleId, 2) &&
               this.isLevelComplete(moduleId, 3) &&
               this.isLevelComplete(moduleId, 4);
    }

    /**
     * Mark a module as officially completed
     * @param {string} moduleId - Module identifier
     */
    markModuleComplete(moduleId) {
        this.initModule(moduleId);
        this.data[moduleId].completed = true;
        this.data[moduleId].completedDate = Date.now();
        this.save();
    }

    /**
     * Get array of all completed module IDs
     * @returns {string[]} Array of module IDs
     */
    getCompletedModules() {
        return Object.keys(this.data).filter(moduleId =>
            this.data[moduleId].completed === true
        );
    }

    /**
     * Get completion statistics for a module
     * @param {string} moduleId - Module identifier
     * @returns {Object} Statistics object
     */
    getStats(moduleId) {
        const progress = this.getProgress(moduleId);
        return {
            level1Complete: this.isLevelComplete(moduleId, 1),
            level2Complete: this.isLevelComplete(moduleId, 2),
            level3Complete: this.isLevelComplete(moduleId, 3),
            level4Complete: this.isLevelComplete(moduleId, 4),
            allLevelsComplete: this.isModuleComplete(moduleId),
            markedComplete: progress.completed,
            totalCorrect: progress.level1Correct + progress.level2Correct +
                         progress.level3Correct + progress.level4Correct,
            completedDate: progress.completedDate
        };
    }

    /**
     * Load progress data from localStorage
     * @returns {Object} Progress data object
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load module progress:', error);
        }
        return {};
    }

    /**
     * Save progress data to localStorage
     */
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (error) {
            console.error('Failed to save module progress:', error);
        }
    }

    /**
     * Clear all progress data
     */
    clear() {
        this.data = {};
        this.save();
    }

    /**
     * Reset a specific module's progress
     * @param {string} moduleId - Module identifier
     */
    resetModule(moduleId) {
        delete this.data[moduleId];
        this.save();
    }
}

// Export singleton instance
const moduleProgress = new ModuleProgress();
export default moduleProgress;

```

---
### `src\core\performanceAnalyzer.js`
**Type:** js

```js
/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * PerformanceAnalyzer - Real-time performance tracking during practice sessions
 *
 * Tracks metrics during an active session:
 * - Accuracy (correct vs incorrect)
 * - Response times
 * - Consecutive errors
 * - Streak breaks
 * - Rolling metrics (last 5 questions)
 * - Struggling patterns detection
 *
 * This analyzer provides real-time data to the AdaptiveDifficultyEngine
 * for making intervention decisions during a session.
 */

class PerformanceAnalyzer {
  constructor() {
    this.reset();
  }

  /**
   * Reset analyzer for new session
   */
  reset() {
    // Current session data
    this.sessionId = null;
    this.moduleId = null;
    this.currentLevel = null;
    this.studentId = null;

    // Question tracking
    this.questionResults = [];
    this.totalQuestions = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;

    // Response time tracking
    this.responseTimes = [];

    // Streak tracking
    this.currentStreak = 0;
    this.consecutiveErrors = 0;
    this.streakBreaks = 0; // Times streak was broken

    // Struggling indicators
    this.slowResponses = 0; // Count of responses > expected time
    this.fastIncorrect = 0; // Count of fast but wrong answers (guessing)

    // Rolling window (last 5 questions)
    this.rollingWindow = [];
    this.rollingWindowSize = 5;

    console.log('📊 PerformanceAnalyzer: Reset for new session');
  }

  /**
   * Start tracking a new session
   * @param {string} sessionId - Session ID
   * @param {string} studentId - Student ID
   * @param {string} moduleId - Module ID
   * @param {number} level - Difficulty level (1-4)
   */
  startSession(sessionId, studentId, moduleId, level) {
    this.reset();
    this.sessionId = sessionId;
    this.studentId = studentId;
    this.moduleId = moduleId;
    this.currentLevel = level;

    console.log(`📊 PerformanceAnalyzer: Started tracking session ${sessionId} - ${moduleId} L${level}`);
  }

  /**
   * Record a question result
   * @param {Object} result - Question result object
   * @param {boolean} result.correct - Whether answer was correct
   * @param {number} result.timeMs - Response time in milliseconds
   * @param {string} result.questionText - Question text (optional)
   * @param {string} result.answer - Student's answer (optional)
   */
  recordResult(result) {
    if (!this.sessionId) {
      console.warn('⚠️ PerformanceAnalyzer: No active session. Call startSession() first.');
      return;
    }

    const questionData = {
      timestamp: Date.now(),
      correct: result.correct,
      timeMs: result.timeMs || null,
      questionText: result.questionText || '',
      studentAnswer: result.answer || ''
    };

    // Add to full results
    this.questionResults.push(questionData);
    this.totalQuestions++;

    // Update counts
    if (result.correct) {
      this.correctCount++;
      this.currentStreak++;
      this.consecutiveErrors = 0; // Reset error streak
    } else {
      this.incorrectCount++;

      // Track streak break
      if (this.currentStreak > 0) {
        this.streakBreaks++;
      }

      this.currentStreak = 0;
      this.consecutiveErrors++;
    }

    // Track response time
    if (result.timeMs) {
      this.responseTimes.push(result.timeMs);

      // Classify response time
      const expectedTime = this.getExpectedResponseTime();

      if (result.timeMs > expectedTime * 1.5) {
        // Slow response (> 150% of expected)
        this.slowResponses++;
      }

      if (!result.correct && result.timeMs < expectedTime * 0.5) {
        // Fast but wrong (< 50% of expected) - possible guessing
        this.fastIncorrect++;
      }
    }

    // Update rolling window
    this.rollingWindow.push(questionData);
    if (this.rollingWindow.length > this.rollingWindowSize) {
      this.rollingWindow.shift(); // Remove oldest
    }

    console.log(`📊 PerformanceAnalyzer: Q${this.totalQuestions} - ${result.correct ? '✓' : '✗'} (${result.timeMs}ms) - Accuracy: ${this.getCurrentAccuracy()}%`);
  }

  /**
   * Get expected response time based on current level
   * @returns {number} Expected time in milliseconds
   */
  getExpectedResponseTime() {
    // Expected response times by level (in ms)
    const expectedTimes = {
      1: 8000,  // Beginning: 8 seconds
      2: 6000,  // Developing: 6 seconds
      3: 5000,  // Meeting: 5 seconds
      4: 4000   // Exceeding: 4 seconds
    };

    return expectedTimes[this.currentLevel] || 5000;
  }

  /**
   * Get current overall accuracy
   * @returns {number} Accuracy percentage (0-100)
   */
  getCurrentAccuracy() {
    if (this.totalQuestions === 0) return 0;
    return Math.round((this.correctCount / this.totalQuestions) * 100);
  }

  /**
   * Get rolling accuracy (last N questions)
   * @returns {number} Rolling accuracy percentage (0-100)
   */
  getRollingAccuracy() {
    if (this.rollingWindow.length === 0) return 0;

    const correctInWindow = this.rollingWindow.filter(q => q.correct).length;
    return Math.round((correctInWindow / this.rollingWindow.length) * 100);
  }

  /**
   * Get average response time
   * @returns {number} Average time in milliseconds
   */
  getAverageResponseTime() {
    if (this.responseTimes.length === 0) return 0;

    const sum = this.responseTimes.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / this.responseTimes.length);
  }

  /**
   * Get rolling average response time (last N questions)
   * @returns {number} Rolling average in milliseconds
   */
  getRollingAverageResponseTime() {
    const windowTimes = this.rollingWindow
      .map(q => q.timeMs)
      .filter(time => time !== null);

    if (windowTimes.length === 0) return 0;

    const sum = windowTimes.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / windowTimes.length);
  }

  /**
   * Check if student is currently struggling
   * Multiple indicators:
   * - Low rolling accuracy (< 40%)
   * - High consecutive errors (3+)
   * - Slow response times
   * - Multiple streak breaks
   *
   * @returns {Object} Struggling analysis
   */
  isStruggling() {
    // Need at least 5 questions to make assessment
    if (this.totalQuestions < 5) {
      return {
        struggling: false,
        confidence: 'insufficient_data',
        indicators: []
      };
    }

    const indicators = [];
    let strugglingScore = 0;

    // Check 1: Low rolling accuracy
    const rollingAcc = this.getRollingAccuracy();
    if (rollingAcc < 40) {
      indicators.push(`Low accuracy: ${rollingAcc}%`);
      strugglingScore += 3;
    } else if (rollingAcc < 60) {
      indicators.push(`Below-target accuracy: ${rollingAcc}%`);
      strugglingScore += 1;
    }

    // Check 2: Consecutive errors
    if (this.consecutiveErrors >= 3) {
      indicators.push(`${this.consecutiveErrors} errors in a row`);
      strugglingScore += 3;
    } else if (this.consecutiveErrors >= 2) {
      indicators.push(`${this.consecutiveErrors} consecutive errors`);
      strugglingScore += 1;
    }

    // Check 3: Slow response times
    const avgTime = this.getRollingAverageResponseTime();
    const expectedTime = this.getExpectedResponseTime();
    if (avgTime > expectedTime * 1.5) {
      indicators.push(`Slow responses (avg ${Math.round(avgTime / 1000)}s)`);
      strugglingScore += 2;
    }

    // Check 4: Frequent guessing (fast but incorrect)
    const guessingRate = this.totalQuestions > 0
      ? (this.fastIncorrect / this.totalQuestions)
      : 0;
    if (guessingRate > 0.3) {
      indicators.push('Possible guessing behavior');
      strugglingScore += 2;
    }

    // Check 5: Streak breaks (difficulty maintaining consistency)
    if (this.totalQuestions >= 10 && this.streakBreaks >= 3) {
      indicators.push('Inconsistent performance');
      strugglingScore += 1;
    }

    // Determine overall struggling status
    const struggling = strugglingScore >= 4;

    return {
      struggling,
      score: strugglingScore,
      indicators,
      confidence: this.getConfidenceLevel(strugglingScore)
    };
  }

  /**
   * Determine confidence level based on struggling score
   * @param {number} score - Struggling score (0-10+)
   * @returns {string} Confidence level
   */
  getConfidenceLevel(score) {
    if (score >= 6) return 'very_low';    // Severe struggling
    if (score >= 4) return 'low';         // Clearly struggling
    if (score >= 2) return 'moderate';    // Some difficulty
    if (score >= 1) return 'good';        // Minor issues
    return 'excellent';                   // No issues
  }

  /**
   * Get comprehensive performance metrics
   * @returns {Object} Full metrics object
   */
  getMetrics() {
    const struggling = this.isStruggling();

    return {
      // Session info
      sessionId: this.sessionId,
      studentId: this.studentId,
      moduleId: this.moduleId,
      level: this.currentLevel,

      // Overall performance
      totalQuestions: this.totalQuestions,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      accuracy: this.getCurrentAccuracy(),

      // Rolling metrics
      rollingAccuracy: this.getRollingAccuracy(),
      rollingWindowSize: this.rollingWindow.length,

      // Response times
      averageResponseTime: this.getAverageResponseTime(),
      rollingAverageResponseTime: this.getRollingAverageResponseTime(),
      expectedResponseTime: this.getExpectedResponseTime(),

      // Streaks
      currentStreak: this.currentStreak,
      consecutiveErrors: this.consecutiveErrors,
      streakBreaks: this.streakBreaks,

      // Struggling indicators
      slowResponses: this.slowResponses,
      fastIncorrect: this.fastIncorrect,

      // Analysis
      struggling: struggling.struggling,
      strugglingScore: struggling.score,
      strugglingIndicators: struggling.indicators,
      confidenceLevel: struggling.confidence
    };
  }

  /**
   * Get summary for logging/debugging
   * @returns {string} Formatted summary
   */
  getSummary() {
    const metrics = this.getMetrics();

    return `
📊 Performance Summary:
   Questions: ${metrics.totalQuestions} (${metrics.correctCount}✓ ${metrics.incorrectCount}✗)
   Accuracy: ${metrics.accuracy}% overall, ${metrics.rollingAccuracy}% recent
   Response Time: ${Math.round(metrics.averageResponseTime / 1000)}s avg (${Math.round(metrics.expectedResponseTime / 1000)}s expected)
   Streak: ${metrics.currentStreak} current, ${metrics.consecutiveErrors} consecutive errors
   Confidence: ${metrics.confidenceLevel.toUpperCase()}
   ${metrics.struggling ? '⚠️ STRUGGLING DETECTED: ' + metrics.strugglingIndicators.join(', ') : '✓ Performance within range'}
    `.trim();
  }

  /**
   * Check if enough questions have been answered for analysis
   * @param {number} minQuestions - Minimum questions required (default 5)
   * @returns {boolean}
   */
  hasEnoughData(minQuestions = 5) {
    return this.totalQuestions >= minQuestions;
  }

  /**
   * End current session and return final metrics
   * @returns {Object} Final session metrics
   */
  endSession() {
    if (!this.sessionId) {
      console.warn('⚠️ PerformanceAnalyzer: No active session to end.');
      return null;
    }

    const finalMetrics = this.getMetrics();

    console.log('📊 PerformanceAnalyzer: Session ended');
    console.log(this.getSummary());

    // Reset for next session
    this.reset();

    return finalMetrics;
  }
}

// Export singleton instance
const performanceAnalyzer = new PerformanceAnalyzer();
export default performanceAnalyzer;

```

---
### `src\core\questionEngine.js`
**Type:** js

```js
/**
 * Question Engine
 *
 * Central orchestration system for question generation
 * Manages generator registry and question creation
 */

import { getModule, getParameters } from '../curriculum/modules.js';
import countingGenerator from '../generators/counting.js';
import bondsGenerator from '../generators/bonds.js';
import multiplyGenerator from '../generators/multiply.js';
import fractionsGenerator from '../generators/fractions.js';
import questionHistory from './questionHistory.js';

/**
 * Question Engine Class
 */
class QuestionEngine {
    constructor() {
        this.generators = new Map();
        this.registerDefaultGenerators();
    }

    /**
     * Register all default generators
     */
    registerDefaultGenerators() {
        this.register(countingGenerator);
        this.register(bondsGenerator);
        this.register(multiplyGenerator);
        this.register(fractionsGenerator);
    }

    /**
     * Register a question generator
     * @param {Object} generator - Generator object with moduleId and generate function
     */
    register(generator) {
        if (!generator.moduleId || !generator.generate) {
            throw new Error('Invalid generator: must have moduleId and generate function');
        }
        this.generators.set(generator.moduleId, generator.generate);
    }

    /**
     * Generate a single question
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @returns {Object|null} Question object or null if generation fails
     */
    generateOne(moduleId, level) {
        const generator = this.generators.get(moduleId);
        if (!generator) {
            console.error(`No generator found for module: ${moduleId}`);
            return null;
        }

        const params = getParameters(moduleId, level);
        if (!params) {
            console.error(`No parameters found for ${moduleId} level ${level}`);
            return null;
        }

        try {
            const question = generator(params, level);

            // Add unique ID and timestamp
            question.id = `${moduleId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            question.timestamp = Date.now();

            return question;
        } catch (error) {
            console.error(`Error generating question for ${moduleId}:`, error);
            return null;
        }
    }

    /**
     * Generate multiple questions (with deduplication)
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @param {boolean} checkHistory - Whether to check question history (default: true)
     * @returns {Array} Array of question objects
     */
    generate(moduleId, level, count = 10, checkHistory = true) {
        const questions = [];
        const maxAttempts = count * 10; // Increased to account for duplicate skipping
        let attempts = 0;
        let skippedDuplicates = 0;

        // Clean up expired entries before generating
        if (checkHistory) {
            questionHistory.cleanup();
        }

        while (questions.length < count && attempts < maxAttempts) {
            const question = this.generateOne(moduleId, level);

            if (question) {
                // Check if this question has been seen recently
                if (checkHistory && questionHistory.hasQuestionBeenSeen(question)) {
                    skippedDuplicates++;
                    attempts++;
                    continue; // Skip this duplicate question
                }

                // Add question and mark as seen
                questions.push(question);

                if (checkHistory) {
                    questionHistory.markQuestionAsSeen(question);
                }
            }

            attempts++;
        }

        if (questions.length < count) {
            console.warn(`Only generated ${questions.length} out of ${count} requested questions (${skippedDuplicates} duplicates skipped)`);
        } else if (skippedDuplicates > 0) {
            console.log(`Successfully generated ${questions.length} questions (${skippedDuplicates} duplicates skipped)`);
        }

        return questions;
    }

    /**
     * Get generator for a module
     * @param {string} moduleId - Module identifier
     * @returns {Function|null} Generator function or null
     */
    getGenerator(moduleId) {
        return this.generators.get(moduleId) || null;
    }

    /**
     * Check if generator exists for module
     * @param {string} moduleId - Module identifier
     * @returns {boolean} True if generator exists
     */
    hasGenerator(moduleId) {
        return this.generators.has(moduleId);
    }

    /**
     * Get all registered module IDs
     * @returns {string[]} Array of module IDs with generators
     */
    getRegisteredModules() {
        return Array.from(this.generators.keys());
    }

    /**
     * Get question history statistics
     * @returns {Object} History statistics
     */
    getHistoryStats() {
        return questionHistory.getStats();
    }

    /**
     * Clear question history
     */
    clearHistory() {
        questionHistory.clear();
    }

    /**
     * Set cooldown period for question history
     * @param {number} hours - Cooldown period in hours
     */
    setCooldown(hours) {
        questionHistory.setCooldown(hours);
    }

    /**
     * Get current cooldown period
     * @returns {number} Cooldown in hours
     */
    getCooldownHours() {
        return questionHistory.getCooldownHours();
    }
}

// Create and export singleton instance
const engine = new QuestionEngine();
export default engine;

```

---
### `src\core\questionHistory.js`
**Type:** js

```js
/**
 * Question History Manager
 *
 * Tracks recently seen questions to prevent duplicates within a cooldown period
 * Uses localStorage for persistence across sessions
 */

/**
 * Generate unique fingerprint for a question
 * @param {Object} question - Question object
 * @returns {string} Unique fingerprint
 */
function generateFingerprint(question) {
    // Create fingerprint based on question content, type, and answer
    // This makes questions with same content but different options still unique
    const parts = [
        question.module || '',
        question.level || '',
        question.type || '',
        question.text || '',
        question.answer || ''
    ];

    // For multiple choice, include options to make them more unique
    if (question.options && Array.isArray(question.options)) {
        parts.push(question.options.sort().join('|'));
    }

    // Create a simple hash-like string
    return parts.join('::').toLowerCase().replace(/\s+/g, '_');
}

/**
 * Question History Class
 */
class QuestionHistory {
    constructor() {
        this.storageKey = 'mathsPractice_questionHistory';
        this.cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        this.history = new Map(); // fingerprint -> timestamp
        this.load();
    }

    /**
     * Check if question has been seen recently
     * @param {string} fingerprint - Question fingerprint
     * @returns {boolean} True if seen within cooldown period
     */
    hasSeenRecently(fingerprint) {
        if (!this.history.has(fingerprint)) {
            return false;
        }

        const lastSeen = this.history.get(fingerprint);
        const now = Date.now();
        const timeSince = now - lastSeen;

        // If cooldown has expired, remove from history and return false
        if (timeSince > this.cooldownPeriod) {
            this.history.delete(fingerprint);
            return false;
        }

        return true;
    }

    /**
     * Mark a question as seen
     * @param {string} fingerprint - Question fingerprint
     */
    markAsSeen(fingerprint) {
        this.history.set(fingerprint, Date.now());
    }

    /**
     * Set cooldown period
     * @param {number} hours - Cooldown period in hours
     */
    setCooldown(hours) {
        this.cooldownPeriod = hours * 60 * 60 * 1000;
        // Clean up old entries that are now outside the new cooldown
        this.cleanup();
    }

    /**
     * Get current cooldown period in hours
     * @returns {number} Cooldown in hours
     */
    getCooldownHours() {
        return this.cooldownPeriod / (60 * 60 * 1000);
    }

    /**
     * Clean up expired entries
     */
    cleanup() {
        const now = Date.now();
        const toDelete = [];

        for (const [fingerprint, timestamp] of this.history.entries()) {
            if (now - timestamp > this.cooldownPeriod) {
                toDelete.push(fingerprint);
            }
        }

        toDelete.forEach(fp => this.history.delete(fp));

        // Save after cleanup
        if (toDelete.length > 0) {
            this.save();
        }
    }

    /**
     * Save history to localStorage
     */
    save() {
        try {
            const data = {
                cooldown: this.cooldownPeriod,
                history: Array.from(this.history.entries()),
                lastUpdated: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save question history:', error);
        }
    }

    /**
     * Load history from localStorage
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return;

            const data = JSON.parse(stored);
            this.cooldownPeriod = data.cooldown || this.cooldownPeriod;
            this.history = new Map(data.history || []);

            // Clean up on load
            this.cleanup();
        } catch (error) {
            console.warn('Failed to load question history:', error);
            this.history = new Map();
        }
    }

    /**
     * Clear all history
     */
    clear() {
        this.history.clear();
        localStorage.removeItem(this.storageKey);
    }

    /**
     * Get statistics
     * @returns {Object} Statistics about question history
     */
    getStats() {
        return {
            totalTracked: this.history.size,
            cooldownHours: this.getCooldownHours(),
            oldestEntry: this.getOldestEntry(),
            newestEntry: this.getNewestEntry()
        };
    }

    /**
     * Get oldest entry timestamp
     * @returns {number|null} Timestamp or null
     */
    getOldestEntry() {
        if (this.history.size === 0) return null;
        return Math.min(...Array.from(this.history.values()));
    }

    /**
     * Get newest entry timestamp
     * @returns {number|null} Timestamp or null
     */
    getNewestEntry() {
        if (this.history.size === 0) return null;
        return Math.max(...Array.from(this.history.values()));
    }

    /**
     * Check if a question object has been seen recently
     * @param {Object} question - Question object
     * @returns {boolean} True if seen recently
     */
    hasQuestionBeenSeen(question) {
        const fingerprint = generateFingerprint(question);
        return this.hasSeenRecently(fingerprint);
    }

    /**
     * Mark a question object as seen
     * @param {Object} question - Question object
     */
    markQuestionAsSeen(question) {
        const fingerprint = generateFingerprint(question);
        this.markAsSeen(fingerprint);
        this.save();
    }
}

// Create singleton instance
const questionHistory = new QuestionHistory();

// Export both the class and singleton instance
export { QuestionHistory, generateFingerprint };
export default questionHistory;

```

---
### `src\core\storageManager.js`
**Type:** js

```js
/**
 * Storage Manager
 *
 * Centralized storage system for student profiles, practice sessions, and progress tracking.
 * Part of Phase 4: Progress Persistence
 *
 * Features:
 * - Student profile management (CRUD operations)
 * - Session storage and retrieval
 * - Statistical calculations (accuracy, trends, performance windows)
 * - Automatic cleanup (sessions older than 30 days)
 * - Export/import functionality
 * - Data migration from existing systems
 * - localStorage wrapper with error handling
 */

const STORAGE_KEY = 'mathsPractice_storage';
const MIGRATION_FLAG = 'mathsPractice_migrated_v2';
const DATA_VERSION = '2.0';
const SESSION_RETENTION_DAYS = 30;

class StorageManager {
    constructor() {
        this.data = {
            version: DATA_VERSION,
            students: {},           // studentId -> Student object
            currentStudentId: null, // Currently selected student
            sessions: {},           // sessionId -> Session object
            createdAt: Date.now(),
            lastModified: Date.now()
        };

        this.load();
        this.migrateFromLegacySystems();
        this.cleanup();
    }

    /**
     * ===== STUDENT PROFILE MANAGEMENT =====
     */

    /**
     * Create a new student profile
     * @param {string} name - Student name
     * @param {string} [yearGroup] - Optional year group (e.g., "Year 3")
     * @returns {string} studentId
     */
    createStudent(name, yearGroup = '') {
        const studentId = this.generateId('student');

        this.data.students[studentId] = {
            id: studentId,
            name: name.trim(),
            yearGroup: yearGroup.trim(),
            createdAt: Date.now(),
            lastActive: Date.now(),
            totalSessions: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            moduleProgress: {}, // moduleId -> { completed, levels: { 1-4: correctCount } }
            preferences: {
                defaultLevel: 3,
                defaultQuestionCount: 5
            },
            // Phase 5: Adaptive Difficulty Engine
            adaptiveProfile: {
                enabled: true,                    // Adaptive system enabled for this student
                interventionHistory: [],          // Array of intervention records
                preferences: {
                    autoAdjust: false,            // Auto-accept recommendations (teacher override)
                    interventionFrequency: 'normal' // 'low' | 'normal' | 'high'
                }
            }
        };

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Created student profile: ${name} (${studentId})`);
        return studentId;
    }

    /**
     * Get student profile by ID
     * @param {string} studentId
     * @returns {Object|null} Student object or null
     */
    getStudent(studentId) {
        return this.data.students[studentId] || null;
    }

    /**
     * Get all student profiles
     * @returns {Array} Array of student objects, sorted by last active
     */
    getAllStudents() {
        return Object.values(this.data.students)
            .sort((a, b) => b.lastActive - a.lastActive);
    }

    /**
     * Update student profile
     * @param {string} studentId
     * @param {Object} updates - Fields to update
     * @returns {boolean} Success status
     */
    updateStudent(studentId, updates) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        // Allowed fields to update
        const allowedFields = ['name', 'yearGroup', 'preferences'];
        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                if (field === 'preferences') {
                    student.preferences = { ...student.preferences, ...updates.preferences };
                } else {
                    student[field] = updates[field];
                }
            }
        });

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Updated student: ${student.name}`);
        return true;
    }

    /**
     * Delete student profile and all associated sessions
     * @param {string} studentId
     * @returns {boolean} Success status
     */
    deleteStudent(studentId) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        // Delete all sessions for this student
        Object.keys(this.data.sessions).forEach(sessionId => {
            if (this.data.sessions[sessionId].studentId === studentId) {
                delete this.data.sessions[sessionId];
            }
        });

        // Delete student profile
        delete this.data.students[studentId];

        // Clear current student if it was this one
        if (this.data.currentStudentId === studentId) {
            this.data.currentStudentId = null;
        }

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Deleted student and associated sessions: ${student.name}`);
        return true;
    }

    /**
     * Set currently active student
     * @param {string} studentId
     * @returns {boolean} Success status
     */
    setCurrentStudent(studentId) {
        if (!this.data.students[studentId]) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        this.data.currentStudentId = studentId;
        this.data.students[studentId].lastActive = Date.now();
        this.save();

        console.log(`✓ Set current student: ${this.data.students[studentId].name}`);
        return true;
    }

    /**
     * Get currently active student
     * @returns {Object|null} Current student or null
     */
    getCurrentStudent() {
        return this.data.currentStudentId
            ? this.data.students[this.data.currentStudentId]
            : null;
    }

    /**
     * ===== SESSION MANAGEMENT =====
     */

    /**
     * Create a new practice session
     * @param {string} studentId
     * @param {string} moduleId
     * @param {number} level - Difficulty level (1-4)
     * @param {number} targetCount - Number of questions planned
     * @returns {string} sessionId
     */
    createSession(studentId, moduleId, level, targetCount) {
        const sessionId = this.generateId('session');
        const student = this.data.students[studentId];

        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return null;
        }

        this.data.sessions[sessionId] = {
            id: sessionId,
            studentId,
            moduleId,
            level,
            targetCount,
            startedAt: Date.now(),
            completedAt: null,
            questions: [],          // Array of question results
            finalScore: null,       // { correct, total, percentage }
            powerUpsUsed: 0,
            streakBest: 0,
            completedEarly: false,  // Level 4 early completion flag
            duration: null          // Milliseconds
        };

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Created session: ${moduleId} L${level} for ${student.name}`);
        return sessionId;
    }

    /**
     * Record a question result in current session
     * @param {string} sessionId
     * @param {Object} questionResult - { correct, timeMs, question, answer }
     */
    recordQuestionResult(sessionId, questionResult) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        session.questions.push({
            timestamp: Date.now(),
            correct: questionResult.correct,
            timeMs: questionResult.timeMs || null,
            questionText: questionResult.question || '',
            studentAnswer: questionResult.answer || '',
            questionType: questionResult.type || 'unknown'
        });

        this.data.lastModified = Date.now();
        this.save();
    }

    /**
     * Record a power-up used in session
     * @param {string} sessionId
     */
    recordPowerUp(sessionId) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        session.powerUpsUsed++;
        this.save();
    }

    /**
     * Update best streak for session
     * @param {string} sessionId
     * @param {number} streak
     */
    updateBestStreak(sessionId, streak) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        if (streak > session.streakBest) {
            session.streakBest = streak;
            this.save();
        }
    }

    /**
     * Complete a practice session
     * @param {string} sessionId
     * @param {Object} finalScore - { correct, total, percentage }
     * @param {boolean} [completedEarly] - Level 4 early completion flag
     */
    completeSession(sessionId, finalScore, completedEarly = false) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        const student = this.data.students[session.studentId];
        if (!student) {
            console.warn(`Student ${session.studentId} not found`);
            return;
        }

        // Finalize session
        session.completedAt = Date.now();
        session.duration = session.completedAt - session.startedAt;
        session.finalScore = finalScore;
        session.completedEarly = completedEarly;

        // Update student aggregates
        student.totalSessions++;
        student.totalQuestions += finalScore.total;
        student.totalCorrect += finalScore.correct;
        student.lastActive = Date.now();

        // Update student module progress
        if (!student.moduleProgress[session.moduleId]) {
            student.moduleProgress[session.moduleId] = {
                completed: false,
                levels: { 1: 0, 2: 0, 3: 0, 4: 0 }
            };
        }

        const moduleProgress = student.moduleProgress[session.moduleId];
        moduleProgress.levels[session.level] += finalScore.correct;

        // Check if module is now complete (3+ correct at all 4 levels)
        const isComplete =
            moduleProgress.levels[1] >= 3 &&
            moduleProgress.levels[2] >= 3 &&
            moduleProgress.levels[3] >= 3 &&
            moduleProgress.levels[4] >= 3;

        if (isComplete && !moduleProgress.completed) {
            moduleProgress.completed = true;
            console.log(`🏆 Module completed: ${session.moduleId} by ${student.name}`);
        }

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Completed session: ${finalScore.correct}/${finalScore.total} (${finalScore.percentage}%)`);
    }

    /**
     * Get session by ID
     * @param {string} sessionId
     * @returns {Object|null} Session object or null
     */
    getSession(sessionId) {
        return this.data.sessions[sessionId] || null;
    }

    /**
     * Get all sessions for a student
     * @param {string} studentId
     * @param {Object} [filters] - Optional filters { moduleId, level, limit }
     * @returns {Array} Array of sessions, newest first
     */
    getStudentSessions(studentId, filters = {}) {
        let sessions = Object.values(this.data.sessions)
            .filter(s => s.studentId === studentId && s.completedAt !== null);

        // Apply filters
        if (filters.moduleId) {
            sessions = sessions.filter(s => s.moduleId === filters.moduleId);
        }
        if (filters.level) {
            sessions = sessions.filter(s => s.level === filters.level);
        }

        // Sort by completion date (newest first)
        sessions.sort((a, b) => b.completedAt - a.completedAt);

        // Apply limit
        if (filters.limit) {
            sessions = sessions.slice(0, filters.limit);
        }

        return sessions;
    }

    /**
     * ===== STATISTICS & RECOMMENDATIONS =====
     */

    /**
     * Calculate overall statistics for a student
     * @param {string} studentId
     * @returns {Object} Statistics object
     */
    getStudentStats(studentId) {
        const student = this.data.students[studentId];
        if (!student) return null;

        const sessions = this.getStudentSessions(studentId);

        return {
            totalSessions: student.totalSessions,
            totalQuestions: student.totalQuestions,
            totalCorrect: student.totalCorrect,
            overallAccuracy: student.totalQuestions > 0
                ? Math.round((student.totalCorrect / student.totalQuestions) * 100)
                : 0,
            recentSessions: sessions.slice(0, 5),
            bestStreak: Math.max(...sessions.map(s => s.streakBest), 0),
            totalPowerUps: sessions.reduce((sum, s) => sum + s.powerUpsUsed, 0),
            completedModules: Object.values(student.moduleProgress)
                .filter(m => m.completed).length,
            averageSessionTime: this.calculateAverageSessionTime(sessions),
            lastActive: student.lastActive
        };
    }

    /**
     * Get performance window (last 3 sessions) for a module/level
     * @param {string} studentId
     * @param {string} moduleId
     * @param {number} level
     * @returns {Object} Performance data
     */
    getPerformanceWindow(studentId, moduleId, level) {
        const sessions = this.getStudentSessions(studentId, {
            moduleId,
            level,
            limit: 3
        });

        if (sessions.length === 0) {
            return {
                sessionCount: 0,
                averageAccuracy: 0,
                trend: 'insufficient_data',
                isImproving: false,
                isDeclining: false
            };
        }

        const accuracies = sessions.map(s => s.finalScore.percentage);
        const averageAccuracy = Math.round(
            accuracies.reduce((a, b) => a + b, 0) / accuracies.length
        );

        // Determine trend (newest to oldest)
        let trend = 'stable';
        let isImproving = false;
        let isDeclining = false;

        if (sessions.length >= 2) {
            const recentAccuracy = accuracies[0]; // Most recent
            const olderAccuracy = accuracies[accuracies.length - 1]; // Oldest

            if (recentAccuracy > olderAccuracy + 10) {
                trend = 'improving';
                isImproving = true;
            } else if (recentAccuracy < olderAccuracy - 10) {
                trend = 'declining';
                isDeclining = true;
            }
        }

        return {
            sessionCount: sessions.length,
            averageAccuracy,
            trend,
            isImproving,
            isDeclining,
            recentSessions: sessions
        };
    }

    /**
     * Get recommended level for a module based on performance
     * @param {string} studentId
     * @param {string} moduleId
     * @returns {number} Recommended level (1-4)
     */
    getRecommendedLevel(studentId, moduleId) {
        const student = this.data.students[studentId];
        if (!student) return 3; // Default to Level 3

        // Start with student's default preference
        let recommendedLevel = student.preferences.defaultLevel || 3;

        // Check if module has been attempted
        const moduleProgress = student.moduleProgress[moduleId];
        if (!moduleProgress) {
            return recommendedLevel; // No data yet, use preference
        }

        // Check performance at each level (starting from highest)
        for (let level = 4; level >= 1; level--) {
            const performance = this.getPerformanceWindow(studentId, moduleId, level);

            // If average accuracy is >= 80% in last 3 sessions, recommend this level or higher
            if (performance.sessionCount >= 2 && performance.averageAccuracy >= 80) {
                recommendedLevel = Math.min(level + 1, 4); // Suggest one level up, max 4
                break;
            }

            // If accuracy is 60-79%, stay at this level
            if (performance.sessionCount >= 2 && performance.averageAccuracy >= 60) {
                recommendedLevel = level;
                break;
            }

            // If accuracy is < 60% and declining, suggest one level down
            if (performance.sessionCount >= 2 &&
                performance.averageAccuracy < 60 &&
                performance.isDeclining) {
                recommendedLevel = Math.max(level - 1, 1); // Min level 1
                break;
            }
        }

        return recommendedLevel;
    }

    /**
     * Calculate average session time
     * @param {Array} sessions
     * @returns {number} Average duration in milliseconds
     */
    calculateAverageSessionTime(sessions) {
        if (sessions.length === 0) return 0;

        const validSessions = sessions.filter(s => s.duration !== null);
        if (validSessions.length === 0) return 0;

        const totalTime = validSessions.reduce((sum, s) => sum + s.duration, 0);
        return Math.round(totalTime / validSessions.length);
    }

    /**
     * ===== ADAPTIVE PROFILE MANAGEMENT (Phase 5) =====
     */

    /**
     * Get adaptive profile for a student
     * @param {string} studentId
     * @returns {Object|null} Adaptive profile or null
     */
    getAdaptiveProfile(studentId) {
        const student = this.data.students[studentId];
        if (!student) return null;

        // Ensure adaptiveProfile exists (for legacy students)
        if (!student.adaptiveProfile) {
            student.adaptiveProfile = {
                enabled: true,
                interventionHistory: [],
                preferences: {
                    autoAdjust: false,
                    interventionFrequency: 'normal'
                }
            };
            this.save();
        }

        return student.adaptiveProfile;
    }

    /**
     * Update adaptive preferences for a student
     * @param {string} studentId
     * @param {Object} preferences - Preferences to update
     * @returns {boolean} Success status
     */
    updateAdaptivePreferences(studentId, preferences) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        const profile = this.getAdaptiveProfile(studentId);
        profile.preferences = { ...profile.preferences, ...preferences };

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Updated adaptive preferences for ${student.name}`);
        return true;
    }

    /**
     * Enable or disable adaptive system for a student
     * @param {string} studentId
     * @param {boolean} enabled
     * @returns {boolean} Success status
     */
    setAdaptiveEnabled(studentId, enabled) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        const profile = this.getAdaptiveProfile(studentId);
        profile.enabled = enabled;

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Adaptive system ${enabled ? 'ENABLED' : 'DISABLED'} for ${student.name}`);
        return true;
    }

    /**
     * Record an intervention (suggestion made to student)
     * @param {string} studentId
     * @param {Object} intervention - Intervention data from adaptiveDifficultyEngine
     * @param {boolean} accepted - Whether student accepted the suggestion
     * @param {string} sessionId - Session where intervention occurred
     */
    recordIntervention(studentId, intervention, accepted, sessionId) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return;
        }

        const profile = this.getAdaptiveProfile(studentId);

        const interventionRecord = {
            id: this.generateId('intervention'),
            timestamp: Date.now(),
            sessionId,
            moduleId: intervention.moduleId,
            currentLevel: intervention.currentLevel,
            suggestedLevel: intervention.suggestedLevel,
            type: intervention.type, // 'decrease' | 'increase' | 'switch_module'
            reason: intervention.reason,
            confidenceScore: intervention.confidence.score,
            confidenceLevel: intervention.confidence.level,
            accepted,
            triggeredAt: intervention.triggeredAt // Question number
        };

        profile.interventionHistory.push(interventionRecord);

        // Keep only last 50 interventions per student (prevent unbounded growth)
        if (profile.interventionHistory.length > 50) {
            profile.interventionHistory = profile.interventionHistory.slice(-50);
        }

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Recorded intervention: ${intervention.type} ${accepted ? 'ACCEPTED' : 'DECLINED'}`);
    }

    /**
     * Get intervention history for a student
     * @param {string} studentId
     * @param {Object} [filters] - Optional filters { moduleId, limit, accepted }
     * @returns {Array} Array of intervention records
     */
    getInterventionHistory(studentId, filters = {}) {
        const profile = this.getAdaptiveProfile(studentId);
        if (!profile) return [];

        let history = [...profile.interventionHistory];

        // Apply filters
        if (filters.moduleId) {
            history = history.filter(i => i.moduleId === filters.moduleId);
        }
        if (filters.accepted !== undefined) {
            history = history.filter(i => i.accepted === filters.accepted);
        }

        // Sort by timestamp (newest first)
        history.sort((a, b) => b.timestamp - a.timestamp);

        // Apply limit
        if (filters.limit) {
            history = history.slice(0, filters.limit);
        }

        return history;
    }

    /**
     * Get intervention statistics for a student
     * @param {string} studentId
     * @returns {Object} Statistics about interventions
     */
    getInterventionStats(studentId) {
        const history = this.getInterventionHistory(studentId);

        if (history.length === 0) {
            return {
                totalInterventions: 0,
                acceptedCount: 0,
                declinedCount: 0,
                acceptanceRate: 0,
                byType: {},
                mostCommonType: null
            };
        }

        const acceptedCount = history.filter(i => i.accepted).length;
        const declinedCount = history.length - acceptedCount;

        // Count by type
        const byType = {};
        history.forEach(i => {
            if (!byType[i.type]) {
                byType[i.type] = { total: 0, accepted: 0, declined: 0 };
            }
            byType[i.type].total++;
            if (i.accepted) {
                byType[i.type].accepted++;
            } else {
                byType[i.type].declined++;
            }
        });

        // Find most common type
        const mostCommonType = Object.keys(byType).reduce((max, type) => {
            return byType[type].total > (byType[max]?.total || 0) ? type : max;
        }, null);

        return {
            totalInterventions: history.length,
            acceptedCount,
            declinedCount,
            acceptanceRate: Math.round((acceptedCount / history.length) * 100),
            byType,
            mostCommonType,
            recentInterventions: history.slice(0, 5)
        };
    }

    /**
     * ===== EXPORT / IMPORT =====
     */

    /**
     * Export all data as JSON
     * @param {string} [studentId] - Optional: export single student only
     * @returns {string} JSON string
     */
    exportData(studentId = null) {
        if (studentId) {
            // Export single student
            const student = this.data.students[studentId];
            if (!student) {
                console.warn(`Student ${studentId} not found`);
                return null;
            }

            const studentSessions = this.getStudentSessions(studentId);

            const exportData = {
                version: DATA_VERSION,
                exportedAt: Date.now(),
                exportType: 'single_student',
                student,
                sessions: studentSessions
            };

            return JSON.stringify(exportData, null, 2);
        } else {
            // Export all data
            const exportData = {
                ...this.data,
                exportedAt: Date.now(),
                exportType: 'full_backup'
            };

            return JSON.stringify(exportData, null, 2);
        }
    }

    /**
     * Import data from JSON
     * @param {string} jsonString - JSON data to import
     * @param {Object} [options] - Import options { merge: boolean }
     * @returns {Object} Import result { success, message, stats }
     */
    importData(jsonString, options = { merge: false }) {
        try {
            const importData = JSON.parse(jsonString);

            // Validate version
            if (!importData.version || importData.version !== DATA_VERSION) {
                return {
                    success: false,
                    message: `Version mismatch. Expected ${DATA_VERSION}, got ${importData.version || 'unknown'}`
                };
            }

            if (importData.exportType === 'single_student') {
                // Import single student
                const newStudentId = this.generateId('student');
                const student = { ...importData.student, id: newStudentId };

                this.data.students[newStudentId] = student;

                // Import sessions with new student ID
                let sessionCount = 0;
                importData.sessions.forEach(session => {
                    const newSessionId = this.generateId('session');
                    this.data.sessions[newSessionId] = {
                        ...session,
                        id: newSessionId,
                        studentId: newStudentId
                    };
                    sessionCount++;
                });

                this.data.lastModified = Date.now();
                this.save();

                return {
                    success: true,
                    message: `Imported student: ${student.name}`,
                    stats: { students: 1, sessions: sessionCount }
                };

            } else if (importData.exportType === 'full_backup') {
                // Full data import
                if (options.merge) {
                    // Merge with existing data
                    this.data.students = { ...this.data.students, ...importData.students };
                    this.data.sessions = { ...this.data.sessions, ...importData.sessions };
                } else {
                    // Replace all data
                    this.data = importData;
                }

                this.data.lastModified = Date.now();
                this.save();

                return {
                    success: true,
                    message: 'Data imported successfully',
                    stats: {
                        students: Object.keys(this.data.students).length,
                        sessions: Object.keys(this.data.sessions).length
                    }
                };
            } else {
                return {
                    success: false,
                    message: 'Unknown export type'
                };
            }

        } catch (error) {
            console.error('Import error:', error);
            return {
                success: false,
                message: `Import failed: ${error.message}`
            };
        }
    }

    /**
     * ===== DATA MANAGEMENT =====
     */

    /**
     * Clean up old sessions (>30 days)
     */
    cleanup() {
        const cutoffDate = Date.now() - (SESSION_RETENTION_DAYS * 24 * 60 * 60 * 1000);
        let cleanedCount = 0;

        Object.keys(this.data.sessions).forEach(sessionId => {
            const session = this.data.sessions[sessionId];
            if (session.completedAt && session.completedAt < cutoffDate) {
                delete this.data.sessions[sessionId];
                cleanedCount++;
            }
        });

        if (cleanedCount > 0) {
            console.log(`🧹 Cleaned up ${cleanedCount} old sessions (>${SESSION_RETENTION_DAYS} days)`);
            this.save();
        }
    }

    /**
     * Migrate data from legacy systems (Phase 1-3.5)
     */
    migrateFromLegacySystems() {
        // Check if already migrated
        if (localStorage.getItem(MIGRATION_FLAG)) {
            return;
        }

        console.log('🔄 Migrating data from legacy systems...');

        // Check for legacy module progress
        const legacyProgress = localStorage.getItem('mathsPractice_moduleProgress');
        if (legacyProgress) {
            try {
                const progressData = JSON.parse(legacyProgress);

                // Create a default "Legacy User" student if data exists
                if (Object.keys(progressData).length > 0) {
                    const legacyStudentId = this.createStudent('Legacy User', '');
                    const student = this.data.students[legacyStudentId];

                    // Migrate module progress
                    Object.entries(progressData).forEach(([moduleId, moduleData]) => {
                        student.moduleProgress[moduleId] = {
                            completed: moduleData.completed || false,
                            levels: moduleData.levels || { 1: 0, 2: 0, 3: 0, 4: 0 }
                        };
                    });

                    this.save();
                    console.log('✓ Migrated legacy module progress to "Legacy User"');
                }
            } catch (error) {
                console.error('Failed to migrate legacy progress:', error);
            }
        }

        // Mark migration as complete
        localStorage.setItem(MIGRATION_FLAG, 'true');
        console.log('✓ Migration complete');
    }

    /**
     * Clear all data (use with caution!)
     */
    clearAllData() {
        this.data = {
            version: DATA_VERSION,
            students: {},
            currentStudentId: null,
            sessions: {},
            createdAt: Date.now(),
            lastModified: Date.now()
        };
        this.save();
        console.log('⚠️ All data cleared');
    }

    /**
     * ===== PERSISTENCE =====
     */

    /**
     * Save data to localStorage
     */
    save() {
        try {
            const jsonString = JSON.stringify(this.data);
            localStorage.setItem(STORAGE_KEY, jsonString);
        } catch (error) {
            console.error('Failed to save to localStorage:', error);

            // Check if quota exceeded
            if (error.name === 'QuotaExceededError') {
                console.error('⚠️ localStorage quota exceeded! Consider cleaning up old sessions.');
                alert('Storage limit reached. Please export your data and clear old sessions.');
            }
        }
    }

    /**
     * Load data from localStorage
     */
    load() {
        try {
            const jsonString = localStorage.getItem(STORAGE_KEY);
            if (jsonString) {
                const loadedData = JSON.parse(jsonString);

                // Validate version
                if (loadedData.version === DATA_VERSION) {
                    this.data = loadedData;
                    console.log('✓ Loaded storage data from localStorage');
                } else {
                    console.warn(`Version mismatch in storage. Expected ${DATA_VERSION}, got ${loadedData.version}`);
                }
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
    }

    /**
     * Generate unique ID
     * @param {string} prefix - Prefix for ID (e.g., 'student', 'session')
     * @returns {string} Unique ID
     */
    generateId(prefix) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 9);
        return `${prefix}_${timestamp}_${random}`;
    }

    /**
     * Get storage size info
     * @returns {Object} Storage statistics
     */
    getStorageInfo() {
        const jsonString = JSON.stringify(this.data);
        const sizeInBytes = new Blob([jsonString]).size;
        const sizeInKB = Math.round(sizeInBytes / 1024);
        const estimatedMaxKB = 5120; // 5MB typical localStorage limit

        return {
            sizeInBytes,
            sizeInKB,
            sizeInMB: (sizeInKB / 1024).toFixed(2),
            percentUsed: Math.round((sizeInKB / estimatedMaxKB) * 100),
            studentCount: Object.keys(this.data.students).length,
            sessionCount: Object.keys(this.data.sessions).length,
            oldestSession: this.getOldestSessionDate(),
            newestSession: this.getNewestSessionDate()
        };
    }

    /**
     * Get oldest session date
     * @returns {number|null} Timestamp or null
     */
    getOldestSessionDate() {
        const sessions = Object.values(this.data.sessions)
            .filter(s => s.completedAt !== null);

        if (sessions.length === 0) return null;

        return Math.min(...sessions.map(s => s.completedAt));
    }

    /**
     * Get newest session date
     * @returns {number|null} Timestamp or null
     */
    getNewestSessionDate() {
        const sessions = Object.values(this.data.sessions)
            .filter(s => s.completedAt !== null);

        if (sessions.length === 0) return null;

        return Math.max(...sessions.map(s => s.completedAt));
    }
}

// Export singleton instance
const storageManager = new StorageManager();
export default storageManager;

```

---
### `src\core\streakTracker.js`
**Type:** js

```js
/**
 * Streak Tracker Module
 *
 * Tracks consecutive correct answers and determines when power-up is available.
 * Integrates with the auto power-up system (Phase 3).
 */

class StreakTracker {
    constructor() {
        this.currentStreak = 0;
        this.requiredStreak = 3;  // 3 consecutive correct answers
        this.powerUpAvailable = false;
        this.totalCorrectInSession = 0;
        this.totalIncorrectInSession = 0;
    }

    /**
     * Record an answer and update streak
     * @param {boolean} isCorrect - Whether the answer was correct
     * @returns {Object} Status object with streak info
     */
    recordAnswer(isCorrect) {
        if (isCorrect) {
            this.currentStreak++;
            this.totalCorrectInSession++;

            // Check if power-up should be available
            if (this.currentStreak >= this.requiredStreak && !this.powerUpAvailable) {
                this.powerUpAvailable = true;
            }

            return {
                streak: this.currentStreak,
                powerUpAvailable: this.powerUpAvailable,
                justUnlocked: this.currentStreak === this.requiredStreak
            };
        } else {
            // Reset streak on incorrect answer
            const hadPowerUp = this.powerUpAvailable;
            this.reset();
            this.totalIncorrectInSession++;

            return {
                streak: 0,
                powerUpAvailable: false,
                lostPowerUp: hadPowerUp
            };
        }
    }

    /**
     * Reset streak and power-up availability
     */
    reset() {
        this.currentStreak = 0;
        this.powerUpAvailable = false;
    }

    /**
     * Consume the power-up (when power-up is accepted)
     * Resets streak to 0 and removes power-up availability
     */
    consumePowerUp() {
        this.currentStreak = 0;
        this.powerUpAvailable = false;
    }

    /**
     * Get current streak status
     * @returns {Object} Current streak information
     */
    getStatus() {
        return {
            currentStreak: this.currentStreak,
            requiredStreak: this.requiredStreak,
            powerUpAvailable: this.powerUpAvailable,
            progress: Math.min(this.currentStreak / this.requiredStreak, 1),
            totalCorrect: this.totalCorrectInSession,
            totalIncorrect: this.totalIncorrectInSession
        };
    }

    /**
     * Check if streak is "hot" (close to power-up)
     * @returns {boolean} True if 2+ correct in a row
     */
    isHotStreak() {
        return this.currentStreak >= 2;
    }

    /**
     * Reset all session data (for new practice session)
     */
    resetSession() {
        this.currentStreak = 0;
        this.powerUpAvailable = false;
        this.totalCorrectInSession = 0;
        this.totalIncorrectInSession = 0;
    }
}

// Export singleton instance
const streakTracker = new StreakTracker();
export default streakTracker;

```

---
### `src\core\validator.js`
**Type:** js

```js
/**
 * Answer Validator
 *
 * Validates student answers against correct answers
 * Handles different answer formats and provides feedback
 */

/**
 * Normalize answer for comparison
 * @param {string} answer - Answer to normalize
 * @returns {string} Normalized answer
 */
function normalizeAnswer(answer) {
    return String(answer)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '');
}

/**
 * Check if two numbers are approximately equal
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} tolerance - Allowed difference
 * @returns {boolean} True if approximately equal
 */
function approximatelyEqual(a, b, tolerance = 0.01) {
    return Math.abs(a - b) <= tolerance;
}

/**
 * Validate a student's answer
 * @param {Object} question - Question object with answer
 * @param {string} studentAnswer - Student's submitted answer
 * @returns {Object} Validation result { isCorrect, feedback, normalizedAnswer }
 */
export function validate(question, studentAnswer) {
    const correctAnswer = normalizeAnswer(question.answer);
    const submittedAnswer = normalizeAnswer(studentAnswer);

    // Empty answer check
    if (!submittedAnswer) {
        return {
            isCorrect: false,
            feedback: 'Please provide an answer',
            normalizedAnswer: submittedAnswer
        };
    }

    // Exact match
    if (submittedAnswer === correctAnswer) {
        return {
            isCorrect: true,
            feedback: 'Correct!',
            normalizedAnswer: submittedAnswer
        };
    }

    // Try numeric comparison (handles decimal precision issues)
    const numSubmitted = parseFloat(studentAnswer);
    const numCorrect = parseFloat(question.answer);

    if (!isNaN(numSubmitted) && !isNaN(numCorrect)) {
        if (approximatelyEqual(numSubmitted, numCorrect)) {
            return {
                isCorrect: true,
                feedback: 'Correct!',
                normalizedAnswer: submittedAnswer
            };
        }
    }

    // Not correct
    return {
        isCorrect: false,
        feedback: `Not quite. The correct answer is ${question.answer}`,
        normalizedAnswer: submittedAnswer,
        correctAnswer: question.answer
    };
}

/**
 * Validate multiple choice answer
 * @param {Object} question - Question object
 * @param {string} selectedOption - Selected option
 * @returns {Object} Validation result
 */
export function validateMultipleChoice(question, selectedOption) {
    return validate(question, selectedOption);
}

/**
 * Validate text input answer
 * @param {Object} question - Question object
 * @param {string} textInput - Text input value
 * @returns {Object} Validation result
 */
export function validateTextInput(question, textInput) {
    return validate(question, textInput);
}

/**
 * Check if answer is partially correct (for multi-part questions)
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {Object} Partial validation result
 */
export function validatePartial(question, studentAnswer) {
    const result = validate(question, studentAnswer);

    // Could add partial credit logic here in future
    // For now, it's either correct or incorrect

    return {
        ...result,
        partialCredit: result.isCorrect ? 1.0 : 0.0
    };
}

/**
 * Validate answer and return simple boolean
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {boolean} True if correct
 */
export function isCorrect(question, studentAnswer) {
    return validate(question, studentAnswer).isCorrect;
}

export default {
    validate,
    validateMultipleChoice,
    validateTextInput,
    validatePartial,
    isCorrect
};

```

---
### `src\curriculum\modules.js`
**Type:** js

```js
/**
 * Curriculum Module Definitions
 *
 * Defines all curriculum modules with parameters for 4 difficulty levels:
 * Level 1: Beginning
 * Level 2: Developing
 * Level 3: Meeting
 * Level 4: Exceeding
 */

export const MODULES = {
    'counting': {
        id: 'counting',
        name: 'Counting',
        description: 'Number sequences and patterns',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        parameters: {
            max_value: {
                1: 30,
                2: 50,
                3: 100,
                4: 200
            },
            step_sizes: {
                1: [1, 2, 5, 10],
                2: [1, 2, 5, 10],
                3: [1, 2, 5, 10],
                4: [1, 2, 3, 5, 10]
            },
            sequence_length: {
                1: 5,
                2: 8,
                3: 12,
                4: 15
            },
            directions: {
                1: ['forwards'],
                2: ['forwards', 'backwards'],
                3: ['forwards', 'backwards'],
                4: ['forwards', 'backwards']
            }
        }
    },

    'bonds': {
        id: 'bonds',
        name: 'Number Bonds',
        description: 'Addition and subtraction facts',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Calculations',
        parameters: {
            total_value: {
                1: [5, 10],
                2: [10],
                3: [10, 20],
                4: [20]
            },
            missing_part: {
                1: 'second',  // Only second addend missing
                2: 'either',  // Either addend can be missing
                3: 'either',
                4: 'any'      // Total or any part can be missing
            },
            include_subtraction: {
                1: false,
                2: true,
                3: true,
                4: true
            },
            visual_support: {
                1: 'always',
                2: 'often',
                3: 'sometimes',
                4: 'rarely'
            }
        }
    },

    'multiply': {
        id: 'multiply',
        name: 'Multiplication',
        description: 'Times tables practice',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Calculations',
        parameters: {
            times_tables: {
                1: [2, 5, 10],
                2: [2, 3, 4, 5, 10],
                3: [3, 4, 8],
                4: [6, 7, 8, 9]
            },
            max_multiplier: {
                1: 5,
                2: 10,
                3: 12,
                4: 12
            },
            include_division: {
                1: false,
                2: true,
                3: true,
                4: true
            },
            time_limit_seconds: {
                1: 8,
                2: 5,
                3: 3,
                4: 2
            }
        }
    },

    'fractions': {
        id: 'fractions',
        name: 'Fractions',
        description: 'Equivalent fractions',
        icon: '🍰',
        yearGroup: 'Year 4',
        strand: 'Fractions & Decimals',
        parameters: {
            denominators: {
                1: [2, 4],
                2: [2, 3, 4, 5],
                3: [2, 3, 4, 5, 6, 8],
                4: [2, 3, 4, 5, 6, 7, 8, 9]
            },
            max_numerator: {
                1: 3,
                2: 5,
                3: 8,
                4: 10
            },
            include_simplification: {
                1: false,
                2: false,
                3: true,
                4: true
            },
            visual_support: {
                1: 'always',
                2: 'often',
                3: 'sometimes',
                4: 'rarely'
            }
        }
    }
};

/**
 * Get a module by ID
 * @param {string} moduleId - The module identifier
 * @returns {Object|null} Module object or null if not found
 */
export function getModule(moduleId) {
    return MODULES[moduleId] || null;
}

/**
 * Get parameters for a specific module and level
 * @param {string} moduleId - The module identifier
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Parameters object for the specified level
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return {};

    const params = {};
    for (const [key, values] of Object.entries(module.parameters)) {
        params[key] = values[level];
    }
    return params;
}

/**
 * Get all available module IDs
 * @returns {string[]} Array of module IDs
 */
export function getModuleIds() {
    return Object.keys(MODULES);
}

/**
 * Validate level number
 * @param {number} level - Level to validate
 * @returns {boolean} True if valid
 */
export function isValidLevel(level) {
    return [1, 2, 3, 4].includes(level);
}

```

---
### `src\generators\bonds.js`
**Type:** js

```js
/**
 * Number Bonds Question Generator
 *
 * Generates addition and subtraction fact questions
 */

import { getParameters } from '../curriculum/modules.js';

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Helper: Pluralize a noun based on count
 * @param {number} count - The count of items
 * @param {string} singular - The singular form of the noun
 * @param {string} [plural] - Optional custom plural form (defaults to adding 's')
 * @returns {string} The correctly pluralized noun
 */
function pluralize(count, singular, plural = null) {
    if (count === 1) {
        return singular;
    }
    return plural || (singular + 's');
}

/**
 * Helper: Get the correct verb form (handles third-person singular)
 * @param {string} verb - The base verb (e.g., 'find', 'receive', 'buy')
 * @param {boolean} thirdPersonSingular - Whether to use third-person singular form (e.g., 'finds')
 * @returns {string} The correctly conjugated verb
 */
function conjugateVerb(verb, thirdPersonSingular = false) {
    if (!thirdPersonSingular) {
        return verb;
    }

    // Handle common irregular verbs
    const irregulars = {
        'have': 'has',
        'do': 'does',
        'go': 'goes'
    };

    if (irregulars[verb]) {
        return irregulars[verb];
    }

    // Regular verbs: add 's' or 'es'
    if (verb.endsWith('s') || verb.endsWith('sh') || verb.endsWith('ch') ||
        verb.endsWith('x') || verb.endsWith('z')) {
        return verb + 'es';
    } else if (verb.endsWith('y') && !'aeiou'.includes(verb[verb.length - 2])) {
        // e.g., 'carry' -> 'carries'
        return verb.slice(0, -1) + 'ies';
    } else {
        return verb + 's';
    }
}

/**
 * Generate number bonds question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateBondsQuestion(params, level) {
    const total = randomChoice(params.total_value);
    const part1 = Math.floor(Math.random() * (total + 1));
    const part2 = total - part1;

    // Decide operation type
    const includeSubtraction = params.include_subtraction;
    const operations = includeSubtraction
        ? ['addition', 'subtraction', 'multiple_choice']
        : ['addition', 'multiple_choice'];
    const operation = randomChoice(operations);

    // Choose question format
    const questionTypes = ['standard', 'word_problem', 'missing_addend'];
    const questionType = randomChoice(questionTypes);

    if (operation === 'subtraction') {
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'apple', action: 'give away', actionPresent: 'gives away' },
                { item: 'sweet', action: 'eat', actionPresent: 'eats' },
                { item: 'pencil', action: 'lose', actionPresent: 'loses' },
                { item: 'sticker', action: 'give to friends', actionPresent: 'gives to friends' }
            ];
            const context = randomChoice(contexts);
            const itemText = pluralize(total, context.item);

            return {
                text: `Sam has ${total} ${itemText}. He ${context.actionPresent} ${part1}. How many does he have left?`,
                type: 'text_input',
                answer: part2.toString(),
                module: 'bonds',
                level: level
            };
        } else {
            // Standard subtraction
            return {
                text: `${total} − ${part1} = ?`,
                type: 'text_input',
                answer: part2.toString(),
                hint: `Think: What number plus ${part1} makes ${total}?`,
                module: 'bonds',
                level: level
            };
        }
    } else if (operation === 'multiple_choice') {
        // Multiple choice format
        const correctAnswer = part2;
        const options = shuffle([
            correctAnswer,
            correctAnswer + 1,
            correctAnswer - 1,
            total - part1 - 2
        ].filter(n => n >= 0 && n <= total));

        // Ensure we have 4 unique options
        while (options.length < 4) {
            const newOption = Math.floor(Math.random() * (total + 1));
            if (!options.includes(newOption)) {
                options.push(newOption);
            }
        }

        return {
            text: `${part1} + ? = ${total}`,
            type: 'multiple_choice',
            options: shuffle(options.slice(0, 4)),
            answer: correctAnswer.toString(),
            module: 'bonds',
            level: level
        };
    } else {
        // Addition (missing addend)
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'marble', action: 'find', actionPresent: 'finds' },
                { item: 'coin', action: 'get', actionPresent: 'gets' },
                { item: 'toy', action: 'receive', actionPresent: 'receives' },
                { item: 'book', action: 'buy', actionPresent: 'buys' }
            ];
            const context = randomChoice(contexts);
            const itemText = pluralize(part1, context.item);

            return {
                text: `Lucy has ${part1} ${itemText}. She ${context.actionPresent} some more. Now she has ${total}. How many did she ${context.action}?`,
                type: 'text_input',
                answer: part2.toString(),
                module: 'bonds',
                level: level
            };
        } else {
            // Standard missing addend
            return {
                text: `${part1} + ? = ${total}`,
                type: 'text_input',
                answer: part2.toString(),
                hint: `What number do you add to ${part1} to make ${total}?`,
                module: 'bonds',
                level: level
            };
        }
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'bonds',
    generate: generateBondsQuestion
};

```

---
### `src\generators\counting.js`
**Type:** js

```js
/**
 * Counting Question Generator
 *
 * Generates questions for counting sequences and patterns
 */

import { getParameters } from '../curriculum/modules.js';

/**
 * Helper: Choose random item from array
 * @param {Array} array - Array to choose from
 * @returns {*} Random item
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Generate counting sequence question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateCountingQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const maxVal = params.max_value;

    // Generate starting value
    let start = Math.floor(Math.random() * (maxVal / 2));
    start = Math.floor(start / step) * step;

    // Ensure sequence doesn't go negative for backwards counting
    if (direction === 'backwards' && start < step * 6) {
        start = step * 6;
    }

    // Generate sequence
    const sequenceLength = 6;
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        const value = direction === 'forwards'
            ? start + (i * step)
            : start - (i * step);
        sequence.push(value);
    }

    // Choose question type
    const questionTypes = ['fill_blank', 'multiple_choice', 'next_number'];
    const type = randomChoice(questionTypes);

    if (type === 'multiple_choice') {
        // "What comes next?"
        const correctAnswer = sequence[4];
        const options = shuffle([
            correctAnswer,
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + (2 * step)
        ]);

        return {
            text: `What comes next? ${sequence.slice(0, 4).join(', ')}, ...`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'counting',
            level: level
        };
    } else if (type === 'next_number') {
        // Similar to multiple choice but asking for next number explicitly
        const correctAnswer = sequence[4];
        const options = shuffle([
            correctAnswer,
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + step + 1
        ]);

        return {
            text: `Continue the pattern: ${sequence.slice(0, 4).join(', ')}, ?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'counting',
            level: level
        };
    } else {
        // fill_blank: Show sequence with gap in the middle
        const display = [...sequence.slice(0, 5)];
        const gapIndex = 2 + Math.floor(Math.random() * 2); // Gap at position 2 or 3
        const correctAnswer = display[gapIndex];
        display[gapIndex] = '___';

        return {
            text: `Fill in the missing number: ${display.join(', ')}`,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: `The pattern counts ${direction} in ${step}s`,
            module: 'counting',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'counting',
    generate: generateCountingQuestion
};

```

---
### `src\generators\fractions.js`
**Type:** js

```js
/**
 * Fractions Question Generator
 *
 * Generates equivalent fractions questions
 */

import { getParameters } from '../curriculum/modules.js';

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Helper: Find GCD for simplification
 */
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * Helper: Simplify fraction
 */
function simplifyFraction(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
    };
}

/**
 * Generate fractions question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateFractionsQuestion(params, level) {
    const denom1 = randomChoice(params.denominators);
    const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
    const denom2 = denom1 * multiplier;

    // Generate numerator (must be less than denominator for proper fractions)
    const maxNum = Math.min(denom1 - 1, params.max_numerator);
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = num1 * multiplier;

    // Choose question type
    const questionTypes = ['fill_blank', 'multiple_choice', 'identify_equivalent'];
    const type = randomChoice(questionTypes);

    if (type === 'multiple_choice') {
        // "Which fraction equals...?"
        const correctAnswer = `${num2}/${denom2}`;
        const options = shuffle([
            `${num2}/${denom2}`,
            `${num2 + 1}/${denom2}`,
            `${num2}/${denom2 + denom1}`,
            `${num1}/${denom2}`
        ]);

        return {
            text: `Which fraction equals ${num1}/${denom1}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            module: 'fractions',
            level: level
        };
    } else if (type === 'identify_equivalent') {
        // Show multiple fractions, identify which is equivalent
        const correctAnswer = `${num2}/${denom2}`;
        const otherFractions = [
            `${num1 + 1}/${denom1}`,
            `${num2}/${denom2 + 1}`,
            `${num1}/${denom1 * 2}`
        ];
        const options = shuffle([correctAnswer, ...otherFractions.slice(0, 3)]);

        return {
            text: `Which of these is equivalent to ${num1}/${denom1}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            module: 'fractions',
            level: level
        };
    } else {
        // fill_blank: a/b = ?/c format
        return {
            text: `${num1}/${denom1} = ?/${denom2}`,
            type: 'text_input',
            answer: num2.toString(),
            hint: `Type just the numerator (top number). The denominator is ${denom2}.`,
            module: 'fractions',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'fractions',
    generate: generateFractionsQuestion
};

```

---
### `src\generators\multiply.js`
**Type:** js

```js
/**
 * Multiplication Question Generator
 *
 * Generates multiplication and division questions
 */

import { getParameters } from '../curriculum/modules.js';

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Helper: Pluralize a noun based on count
 * @param {number} count - The count of items
 * @param {string} singular - The singular form of the noun
 * @param {string} [plural] - Optional custom plural form (defaults to adding 's')
 * @returns {string} The correctly pluralized noun
 */
function pluralize(count, singular, plural = null) {
    if (count === 1) {
        return singular;
    }
    return plural || (singular + 's');
}

/**
 * Generate multiplication question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateMultiplyQuestion(params, level) {
    const table = randomChoice(params.times_tables);
    const multiplier = Math.floor(Math.random() * params.max_multiplier) + 1;
    const product = table * multiplier;

    // Decide operation type
    const includeDivision = params.include_division;
    const operations = includeDivision
        ? ['multiplication', 'division', 'multiple_choice']
        : ['multiplication', 'multiple_choice'];
    const operation = randomChoice(operations);

    // Choose question format
    const questionTypes = ['standard', 'word_problem', 'missing_factor'];
    const questionType = randomChoice(questionTypes);

    if (operation === 'division') {
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'sweet', itemPlural: 'sweets', container: 'bag', containerPlural: 'bags' },
                { item: 'pencil', itemPlural: 'pencils', container: 'box', containerPlural: 'boxes' },
                { item: 'apple', itemPlural: 'apples', container: 'basket', containerPlural: 'baskets' },
                { item: 'book', itemPlural: 'books', container: 'shelf', containerPlural: 'shelves' }
            ];
            const context = randomChoice(contexts);
            const itemText = pluralize(product, context.item, context.itemPlural);
            const containerText = pluralize(table, context.container, context.containerPlural);
            const containerSingular = context.container;
            const verb = product === 1 ? 'is' : 'are';

            return {
                text: `${product} ${itemText} ${verb} shared equally into ${table} ${containerText}. How many ${itemText} in each ${containerSingular}?`,
                type: 'text_input',
                answer: multiplier.toString(),
                module: 'multiply',
                level: level
            };
        } else {
            // Standard division
            return {
                text: `${product} ÷ ${table} = ?`,
                type: 'text_input',
                answer: multiplier.toString(),
                hint: `Think: ${table} times what equals ${product}?`,
                module: 'multiply',
                level: level
            };
        }
    } else if (operation === 'multiple_choice') {
        // Multiple choice format
        const correctAnswer = product;
        const options = shuffle([
            correctAnswer,
            correctAnswer + table,
            correctAnswer - table,
            table + multiplier
        ]);

        return {
            text: `${table} × ${multiplier} = ?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'multiply',
            level: level
        };
    } else {
        // Multiplication
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'flower', itemPlural: 'flowers', container: 'vase', containerPlural: 'vases' },
                { item: 'cookie', itemPlural: 'cookies', container: 'box', containerPlural: 'boxes' },
                { item: 'student', itemPlural: 'students', container: 'group', containerPlural: 'groups' },
                { item: 'toy', itemPlural: 'toys', container: 'bag', containerPlural: 'bags' }
            ];
            const context = randomChoice(contexts);
            const containerText = pluralize(multiplier, context.container, context.containerPlural);
            const itemText = pluralize(table, context.item, context.itemPlural);
            const itemTextAnswer = pluralize(product, context.item, context.itemPlural);
            const thereVerb = multiplier === 1 ? 'is' : 'are';

            return {
                text: `There ${thereVerb} ${multiplier} ${containerText} with ${table} ${itemText} in each. How many ${itemTextAnswer} in total?`,
                type: 'text_input',
                answer: product.toString(),
                module: 'multiply',
                level: level
            };
        } else if (questionType === 'missing_factor') {
            // Missing factor: ? × table = product
            return {
                text: `? × ${table} = ${product}`,
                type: 'text_input',
                answer: multiplier.toString(),
                hint: `What times ${table} equals ${product}?`,
                module: 'multiply',
                level: level
            };
        } else {
            // Standard multiplication
            return {
                text: `${table} × ${multiplier} = ?`,
                type: 'text_input',
                answer: product.toString(),
                module: 'multiply',
                level: level
            };
        }
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'multiply',
    generate: generateMultiplyQuestion
};

```

---
### `src\ui\adaptiveSuggestionModal.js`
**Type:** js

```js
/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * AdaptiveSuggestionModal - Intervention dialog component
 *
 * Displays child-friendly suggestions to adjust difficulty level during practice.
 * Appears when AdaptiveDifficultyEngine determines student needs support or challenge.
 *
 * Features:
 * - Friendly, positive language
 * - Clear choice (Accept / Decline)
 * - Visual indication of suggested change
 * - Student maintains agency (no forced changes)
 * - Records student response for learning
 */

import storageManager from '../core/storageManager.js';
import adaptiveDifficultyEngine from '../core/adaptiveDifficultyEngine.js';

class AdaptiveSuggestionModal {
    constructor() {
        this.element = null;
        this.currentIntervention = null;
        this.onAcceptCallback = null;
        this.onDeclineCallback = null;
        this.sessionId = null;
        this.studentId = null;
    }

    /**
     * Show intervention suggestion to student
     * @param {Object} intervention - Intervention data from adaptiveDifficultyEngine
     * @param {string} sessionId - Current session ID
     * @param {string} studentId - Current student ID
     * @param {Function} onAccept - Callback when student accepts (receives suggestedLevel)
     * @param {Function} onDecline - Callback when student declines
     */
    show(intervention, sessionId, studentId, onAccept, onDecline) {
        this.currentIntervention = intervention;
        this.sessionId = sessionId;
        this.studentId = studentId;
        this.onAcceptCallback = onAccept;
        this.onDeclineCallback = onDecline;

        // Create modal overlay
        this.element = document.createElement('div');
        this.element.className = 'adaptive-suggestion-overlay';

        // Build modal content based on intervention type
        const content = this.buildModalContent(intervention);

        this.element.innerHTML = `
            <div class="adaptive-suggestion-modal">
                ${content}
            </div>
        `;

        // Add to document
        document.body.appendChild(this.element);

        // Trigger animation
        setTimeout(() => {
            this.element.classList.add('visible');
        }, 10);

        // Add event listeners
        this.attachEventListeners();

        // Record that intervention was shown
        adaptiveDifficultyEngine.recordInterventionShown();

        console.log(`🎯 AdaptiveSuggestionModal: Showing ${intervention.type} suggestion`);
    }

    /**
     * Build modal content HTML based on intervention type
     * @param {Object} intervention - Intervention data
     * @returns {string} HTML content
     */
    buildModalContent(intervention) {
        const { type, title, message, primaryAction, secondaryAction, currentLevel, suggestedLevel, confidence } = intervention;

        // Choose icon based on type
        let icon = '💡';
        let iconClass = 'suggestion';

        if (type === 'decrease') {
            icon = '🤝'; // Helping hand
            iconClass = 'support';
        } else if (type === 'increase') {
            icon = '🌟'; // Star for challenge
            iconClass = 'challenge';
        } else if (type === 'switch_module') {
            icon = '🎯'; // Target for different approach
            iconClass = 'alternative';
        }

        // Build level change visualization
        let levelVisualization = '';
        if (suggestedLevel !== null) {
            const levelLabels = {
                1: 'Beginning',
                2: 'Developing',
                3: 'Meeting',
                4: 'Exceeding'
            };

            levelVisualization = `
                <div class="level-change-visual">
                    <div class="level-current">
                        <div class="level-badge">L${currentLevel}</div>
                        <div class="level-label">${levelLabels[currentLevel]}</div>
                    </div>
                    <div class="level-arrow">→</div>
                    <div class="level-suggested">
                        <div class="level-badge highlight">L${suggestedLevel}</div>
                        <div class="level-label">${levelLabels[suggestedLevel]}</div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="adaptive-suggestion-icon ${iconClass}">${icon}</div>
            <h2 class="adaptive-suggestion-title">${this.escapeHtml(title)}</h2>
            <p class="adaptive-suggestion-message">${this.escapeHtml(message)}</p>
            ${levelVisualization}
            <div class="adaptive-suggestion-actions">
                <button class="adaptive-suggestion-btn primary" data-action="accept">
                    ${this.escapeHtml(primaryAction)}
                </button>
                <button class="adaptive-suggestion-btn secondary" data-action="decline">
                    ${this.escapeHtml(secondaryAction)}
                </button>
            </div>
            <div class="adaptive-suggestion-footer">
                You can always change levels later! 😊
            </div>
        `;
    }

    /**
     * Attach event listeners to modal buttons
     */
    attachEventListeners() {
        const acceptBtn = this.element.querySelector('[data-action="accept"]');
        const declineBtn = this.element.querySelector('[data-action="decline"]');

        acceptBtn?.addEventListener('click', () => this.handleAccept());
        declineBtn?.addEventListener('click', () => this.handleDecline());
    }

    /**
     * Handle student accepting suggestion
     */
    handleAccept() {
        console.log('🎯 AdaptiveSuggestionModal: Student ACCEPTED suggestion');

        // Record intervention response
        if (this.studentId && this.currentIntervention) {
            storageManager.recordIntervention(
                this.studentId,
                this.currentIntervention,
                true, // accepted
                this.sessionId
            );

            adaptiveDifficultyEngine.recordInterventionResponse(
                this.currentIntervention,
                true
            );
        }

        // Close modal
        this.close();

        // Call accept callback with suggested level
        if (this.onAcceptCallback) {
            const suggestedLevel = this.currentIntervention.suggestedLevel;
            this.onAcceptCallback(suggestedLevel);
        }
    }

    /**
     * Handle student declining suggestion
     */
    handleDecline() {
        console.log('🎯 AdaptiveSuggestionModal: Student DECLINED suggestion');

        // Record intervention response
        if (this.studentId && this.currentIntervention) {
            storageManager.recordIntervention(
                this.studentId,
                this.currentIntervention,
                false, // declined
                this.sessionId
            );

            adaptiveDifficultyEngine.recordInterventionResponse(
                this.currentIntervention,
                false
            );
        }

        // Close modal
        this.close();

        // Call decline callback
        if (this.onDeclineCallback) {
            this.onDeclineCallback();
        }
    }

    /**
     * Close and remove modal
     */
    close() {
        if (!this.element) return;

        // Fade out
        this.element.classList.remove('visible');

        // Remove from DOM after animation
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.currentIntervention = null;
            this.onAcceptCallback = null;
            this.onDeclineCallback = null;
        }, 300);
    }

    /**
     * Check if modal is currently showing
     * @returns {boolean}
     */
    isShowing() {
        return this.element !== null;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
const adaptiveSuggestionModal = new AdaptiveSuggestionModal();
export default adaptiveSuggestionModal;

```

---
### `src\ui\app.js`
**Type:** js

```js
/**
 * Main Application Controller
 *
 * Coordinates screen transitions and manages application state
 */

import SetupScreen from './setupScreen.js';
import PracticeScreen from './practiceScreen.js';
import ResultsScreen from './resultsScreen.js';
import questionEngine from '../core/questionEngine.js';

class App {
    constructor() {
        this.currentScreen = null;
        this.currentSession = null;

        // Screen instances
        this.setupScreen = new SetupScreen();
        this.practiceScreen = new PracticeScreen();
        this.resultsScreen = new ResultsScreen();

        // Container references
        this.containers = {
            setup: null,
            practice: null,
            results: null
        };
    }

    /**
     * Initialize the application
     */
    init() {
        // Get container elements
        this.containers.setup = document.getElementById('setupScreen');
        this.containers.practice = document.getElementById('practiceScreen');
        this.containers.results = document.getElementById('resultsScreen');

        // Make questionEngine globally available for Phase 3 level-up
        window.questionEngine = questionEngine;

        // Initialize setup screen
        this.setupScreen.init(this.containers.setup);

        // Setup event listeners
        this.setupEventListeners();

        // Show setup screen
        this.showScreen('setup');
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Start practice event
        document.addEventListener('startPractice', (e) => {
            this.startPractice(e.detail);
        });

        // Practice complete event
        document.addEventListener('practiceComplete', (e) => {
            this.showResults(e.detail);
        });

        // Practice again event
        document.addEventListener('practiceAgain', () => {
            this.practiceAgain();
        });

        // Change topic event
        document.addEventListener('changeTopic', () => {
            this.changeTopic();
        });
    }

    /**
     * Start a practice session
     * @param {Object} config - Practice configuration
     */
    startPractice(config) {
        const { moduleId, level, questionCount } = config;

        // Save current session config
        this.currentSession = config;

        // Generate questions
        const questions = questionEngine.generate(moduleId, level, questionCount);

        if (questions.length === 0) {
            alert('Failed to generate questions. Please try again.');
            return;
        }

        // Initialize and show practice screen (with moduleId and level for Phase 3)
        this.practiceScreen.init(this.containers.practice, questions, moduleId, level);
        this.showScreen('practice');
    }

    /**
     * Show results screen
     * @param {Object} sessionData - Session results data
     */
    showResults(sessionData) {
        this.resultsScreen.init(this.containers.results, sessionData);
        this.showScreen('results');
    }

    /**
     * Practice again with same settings
     */
    practiceAgain() {
        if (this.currentSession) {
            this.startPractice(this.currentSession);
        }
    }

    /**
     * Return to setup screen to change topic
     */
    changeTopic() {
        this.setupScreen.reset();
        this.showScreen('setup');
    }

    /**
     * Show a specific screen
     * @param {string} screenName - Name of screen to show (setup, practice, results)
     */
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.containers).forEach(container => {
            container.classList.add('hidden');
        });

        // Show requested screen
        switch (screenName) {
            case 'setup':
                this.setupScreen.show();
                this.currentScreen = 'setup';
                break;
            case 'practice':
                this.practiceScreen.show();
                this.currentScreen = 'practice';
                break;
            case 'results':
                this.resultsScreen.show();
                this.currentScreen = 'results';
                break;
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;

```

---
### `src\ui\confidenceMeter.js`
**Type:** js

```js
/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * ConfidenceMeter - Visual confidence indicator component
 *
 * Displays real-time confidence score during practice sessions with:
 * - Color-coded progress bar (red → amber → green → blue)
 * - Percentage display
 * - Confidence level label
 * - Smooth animations
 *
 * Color zones:
 * - Red (0-30%): Critical - student struggling significantly
 * - Orange (30-40%): Struggling - student having difficulty
 * - Amber (40-65%): Challenging - student working hard
 * - Green (65-85%): Optimal - ideal learning zone (ZPD)
 * - Blue (85-100%): Excelling - student finding it very easy
 */

import adaptiveDifficultyEngine from '../core/adaptiveDifficultyEngine.js';

class ConfidenceMeter {
    constructor() {
        this.element = null;
        this.currentScore = null;
        this.currentLevel = null;
        this.visible = false;
    }

    /**
     * Initialize the confidence meter
     * @param {HTMLElement} container - Parent container element
     */
    init(container) {
        this.element = document.createElement('div');
        this.element.className = 'confidence-meter';
        this.element.innerHTML = `
            <div class="confidence-meter-content">
                <div class="confidence-meter-header">
                    <span class="confidence-meter-label">Confidence</span>
                    <span class="confidence-meter-value">--</span>
                </div>
                <div class="confidence-meter-bar">
                    <div class="confidence-meter-fill" style="width: 0%"></div>
                    <div class="confidence-meter-zones">
                        <div class="zone zone-critical" style="width: 30%"></div>
                        <div class="zone zone-struggling" style="width: 10%"></div>
                        <div class="zone zone-challenging" style="width: 25%"></div>
                        <div class="zone zone-optimal" style="width: 20%"></div>
                        <div class="zone zone-excelling" style="width: 15%"></div>
                    </div>
                </div>
                <div class="confidence-meter-message"></div>
            </div>
        `;

        container.appendChild(this.element);

        console.log('📊 ConfidenceMeter: Initialized');
    }

    /**
     * Show the confidence meter
     */
    show() {
        if (!this.element) {
            console.warn('ConfidenceMeter: Not initialized. Call init() first.');
            return;
        }

        this.element.classList.add('visible');
        this.visible = true;
    }

    /**
     * Hide the confidence meter
     */
    hide() {
        if (!this.element) return;

        this.element.classList.remove('visible');
        this.visible = false;
    }

    /**
     * Update confidence meter with new score
     * @param {Object} confidenceData - Confidence data from adaptiveDifficultyEngine
     */
    update(confidenceData) {
        if (!this.element || !this.visible) return;

        if (!confidenceData || confidenceData.score === null) {
            this.showInsufficientData();
            return;
        }

        const { score, level, color, message } = confidenceData;

        this.currentScore = score;
        this.currentLevel = level;

        // Update value display
        const valueElement = this.element.querySelector('.confidence-meter-value');
        valueElement.textContent = `${score}%`;

        // Update progress bar
        const fillElement = this.element.querySelector('.confidence-meter-fill');
        fillElement.style.width = `${score}%`;

        // Update color based on zone
        fillElement.className = `confidence-meter-fill confidence-fill-${color}`;

        // Update label with level
        const labelElement = this.element.querySelector('.confidence-meter-label');
        labelElement.textContent = `Confidence: ${level}`;

        // Update message
        const messageElement = this.element.querySelector('.confidence-meter-message');
        messageElement.textContent = message || '';
        messageElement.className = `confidence-meter-message confidence-message-${color}`;

        // Add pulse animation for critical or excelling
        if (level === 'Critical' || level === 'Struggling') {
            this.element.classList.add('pulse-warning');
        } else if (level === 'Excelling') {
            this.element.classList.add('pulse-success');
        } else {
            this.element.classList.remove('pulse-warning', 'pulse-success');
        }

        console.log(`📊 ConfidenceMeter: Updated - ${score}% (${level})`);
    }

    /**
     * Show "insufficient data" state
     */
    showInsufficientData() {
        if (!this.element) return;

        const valueElement = this.element.querySelector('.confidence-meter-value');
        valueElement.textContent = '--';

        const fillElement = this.element.querySelector('.confidence-meter-fill');
        fillElement.style.width = '0%';
        fillElement.className = 'confidence-meter-fill';

        const labelElement = this.element.querySelector('.confidence-meter-label');
        labelElement.textContent = 'Confidence: Calculating...';

        const messageElement = this.element.querySelector('.confidence-meter-message');
        messageElement.textContent = 'Answer a few more questions';
        messageElement.className = 'confidence-meter-message';

        this.element.classList.remove('pulse-warning', 'pulse-success');
    }

    /**
     * Get current confidence score
     * @returns {number|null} Current score or null
     */
    getCurrentScore() {
        return this.currentScore;
    }

    /**
     * Get current confidence level
     * @returns {string|null} Current level label or null
     */
    getCurrentLevel() {
        return this.currentLevel;
    }

    /**
     * Reset meter for new session
     */
    reset() {
        this.currentScore = null;
        this.currentLevel = null;
        this.showInsufficientData();
        this.element?.classList.remove('pulse-warning', 'pulse-success');
    }

    /**
     * Remove meter from DOM
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.visible = false;
    }

    /**
     * Check if meter is currently visible
     * @returns {boolean}
     */
    isVisible() {
        return this.visible;
    }
}

// Export singleton instance
const confidenceMeter = new ConfidenceMeter();
export default confidenceMeter;

```

---
### `src\ui\moduleCompletionPrompt.js`
**Type:** js

```js
/**
 * Module Completion Prompt Component
 *
 * Shows celebration overlay when student completes all 4 levels of a module.
 * Offers to mark the module as officially completed.
 * Part of Phase 3.5: Module Completion System
 */

import moduleProgress from '../core/moduleProgress.js';

class ModuleCompletionPrompt {
    constructor() {
        this.element = null;
        this.isVisible = false;
    }

    /**
     * Show completion prompt for a module (auto-marks as complete)
     * @param {string} moduleId - Module identifier
     * @param {string} moduleName - Module display name
     * @param {string} moduleIcon - Module emoji icon
     * @returns {HTMLElement} Prompt element
     */
    show(moduleId, moduleName, moduleIcon) {
        // Don't show if already marked complete
        const progress = moduleProgress.getProgress(moduleId);
        if (progress.completed) {
            return null;
        }

        // Automatically mark as complete
        moduleProgress.markModuleComplete(moduleId);

        // Remove existing prompt if any
        this.hide();

        // Create overlay element with celebration only
        this.element = document.createElement('div');
        this.element.className = 'completion-overlay';
        this.element.innerHTML = `
            <div class="completion-card">
                <div class="completion-success">
                    <div class="completion-success-icon">🏆</div>
                    <h2>Module Completed!</h2>
                    <div class="completion-module-icon">${moduleIcon}</div>
                    <div class="completion-module-name">${moduleName}</div>
                    <p class="completion-message">
                        Congratulations! You've mastered all difficulty levels!
                    </p>
                    <p class="completion-note">
                        You can still practice this module anytime.
                    </p>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(this.element);
        this.isVisible = true;

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            this.hide();
            // Trigger event to update setup screen badges
            document.dispatchEvent(new CustomEvent('moduleCompleted', {
                detail: { moduleId }
            }));
        }, 3000);

        return this.element;
    }

    /**
     * Hide and remove the prompt
     */
    hide() {
        if (this.element) {
            this.element.classList.add('fade-out');

            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
                this.element = null;
                this.isVisible = false;
            }, 300);
        }
    }

    /**
     * Check if prompt is currently visible
     * @returns {boolean} Visibility status
     */
    isShowing() {
        return this.isVisible;
    }
}

// Export singleton instance
const moduleCompletionPrompt = new ModuleCompletionPrompt();
export default moduleCompletionPrompt;

```

---
### `src\ui\onScreenKeyboard.js`
**Type:** js

```js
/**
 * On-Screen Keyboard Component
 *
 * Provides a touch-optimized calculator-style keyboard for text input questions.
 * Only appears on touch devices; desktop users get native keyboard.
 *
 * Uses internal value storage to avoid readonly input conflicts on mobile devices.
 */

class OnScreenKeyboard {
    constructor() {
        this.element = null;
        this.displayElement = null;  // Custom display div (not a real input)
        this.currentValue = '';      // Internal value storage
        this.isActive = false;
        this.submitCallback = null;
    }

    /**
     * Create and return keyboard DOM element
     * @param {HTMLElement} displayElement - The display element to show typed value
     * @param {Function} onSubmit - Callback function when submit is pressed
     * @returns {HTMLElement} Keyboard element
     */
    create(displayElement, onSubmit) {
        this.displayElement = displayElement;
        this.submitCallback = onSubmit;
        this.currentValue = '';  // Reset value

        // Create keyboard container
        this.element = document.createElement('div');
        this.element.className = 'on-screen-keyboard';
        this.element.innerHTML = `
            <div class="keyboard-container">
                <div class="keyboard-row">
                    <button class="key number-key" data-value="7" type="button">7</button>
                    <button class="key number-key" data-value="8" type="button">8</button>
                    <button class="key number-key" data-value="9" type="button">9</button>
                </div>
                <div class="keyboard-row">
                    <button class="key number-key" data-value="4" type="button">4</button>
                    <button class="key number-key" data-value="5" type="button">5</button>
                    <button class="key number-key" data-value="6" type="button">6</button>
                </div>
                <div class="keyboard-row">
                    <button class="key number-key" data-value="1" type="button">1</button>
                    <button class="key number-key" data-value="2" type="button">2</button>
                    <button class="key number-key" data-value="3" type="button">3</button>
                </div>
                <div class="keyboard-row">
                    <button class="key special-key" data-value="/" type="button">÷</button>
                    <button class="key number-key" data-value="0" type="button">0</button>
                    <button class="key special-key backspace-key" data-action="backspace" type="button">⌫</button>
                </div>
                <div class="keyboard-row last-row">
                    <button class="key special-key" data-value="." type="button">.</button>
                    <button class="key special-key" data-value="-" type="button">−</button>
                    <button class="key submit-key" data-action="submit" type="button">
                        <span class="submit-icon">✓</span>
                        <span class="submit-text">Submit</span>
                    </button>
                </div>
            </div>
        `;

        // Attach event listeners
        this.attachHandlers();

        // Initialize display
        this.updateDisplay();

        return this.element;
    }

    /**
     * Attach event listeners to keyboard keys
     */
    attachHandlers() {
        // Handle key press (works for both mouse and touch)
        const handleKeyPress = (e) => {
            const key = e.target.closest('.key');
            if (!key) return;

            e.preventDefault();
            e.stopPropagation();

            // Trigger haptic feedback if supported
            this.triggerHaptic();

            // Visual feedback
            this.animateKeyPress(key);

            // Handle key action
            if (key.dataset.action === 'backspace') {
                this.handleBackspace();
            } else if (key.dataset.action === 'submit') {
                this.handleSubmit();
            } else if (key.dataset.value) {
                this.handleInput(key.dataset.value);
            }
        };

        // Use touchend for touch devices (click doesn't fire when touchstart has preventDefault)
        this.element.addEventListener('touchend', handleKeyPress, { passive: false });

        // Also handle click for desktop/mouse devices
        this.element.addEventListener('click', handleKeyPress);

        // Prevent scrolling and text selection on touch
        this.element.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    /**
     * Handle number/symbol input
     * @param {string} value - The value to input
     */
    handleInput(value) {
        console.log('handleInput called with:', value); // DEBUG

        // Validation rules
        if (value === '.') {
            // Only allow one decimal point
            if (this.currentValue.includes('.')) {
                console.log('Decimal rejected - already exists'); // DEBUG
                return;
            }
        }

        if (value === '-') {
            // Only allow minus at the beginning
            if (this.currentValue.length > 0) {
                console.log('Minus rejected - not at beginning'); // DEBUG
                return;
            }
        }

        // Update internal value
        this.currentValue += value;
        console.log('New value:', this.currentValue); // DEBUG

        // Update display
        this.updateDisplay();
    }

    /**
     * Handle backspace key
     */
    handleBackspace() {
        // Remove last character from internal value
        this.currentValue = this.currentValue.slice(0, -1);

        // Update display
        this.updateDisplay();
    }

    /**
     * Handle submit key
     */
    handleSubmit() {
        if (this.submitCallback) {
            this.submitCallback();
        }

        // Also dispatch a custom event
        if (this.displayElement) {
            this.displayElement.dispatchEvent(new CustomEvent('keyboardSubmit', {
                bubbles: true,
                detail: { value: this.currentValue }
            }));
        }
    }

    /**
     * Update the display element with current value
     */
    updateDisplay() {
        console.log('updateDisplay called, currentValue:', this.currentValue); // DEBUG

        if (!this.displayElement) {
            console.error('displayElement is null!'); // DEBUG
            return;
        }

        if (this.currentValue === '') {
            // Show placeholder or empty state
            this.displayElement.textContent = '';
            this.displayElement.classList.add('empty');
            console.log('Display cleared (empty)'); // DEBUG
        } else {
            this.displayElement.textContent = this.currentValue;
            this.displayElement.classList.remove('empty');
            console.log('Display updated to:', this.displayElement.textContent); // DEBUG
        }
    }

    /**
     * Get the current typed value
     * @returns {string} Current value
     */
    getValue() {
        return this.currentValue;
    }

    /**
     * Clear the current value
     */
    clearValue() {
        this.currentValue = '';
        this.updateDisplay();
    }

    /**
     * Set a value programmatically
     * @param {string} value - Value to set
     */
    setValue(value) {
        this.currentValue = String(value);
        this.updateDisplay();
    }

    /**
     * Animate key press for visual feedback
     * @param {HTMLElement} key - The key element
     */
    animateKeyPress(key) {
        key.classList.add('pressed');
        setTimeout(() => {
            key.classList.remove('pressed');
        }, 100);
    }

    /**
     * Trigger haptic feedback on supported devices
     */
    triggerHaptic() {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
    }

    /**
     * Show the keyboard with animation
     */
    show() {
        if (this.element) {
            this.element.classList.add('active');
            this.isActive = true;
        }
    }

    /**
     * Hide the keyboard with animation
     */
    hide() {
        if (this.element) {
            this.element.classList.remove('active');
            this.isActive = false;
        }
    }

    /**
     * Disable all keyboard keys
     */
    disable() {
        if (this.element) {
            const keys = this.element.querySelectorAll('.key');
            keys.forEach(key => {
                key.disabled = true;
            });
        }
    }

    /**
     * Enable all keyboard keys
     */
    enable() {
        if (this.element) {
            const keys = this.element.querySelectorAll('.key');
            keys.forEach(key => {
                key.disabled = false;
            });
        }
    }

    /**
     * Destroy the keyboard and cleanup
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.displayElement = null;
        this.currentValue = '';
        this.submitCallback = null;
        this.isActive = false;
    }

    /**
     * Check if device is touch-capable
     * @returns {boolean} True if touch device
     */
    static isTouchDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(hover: none) and (pointer: coarse)').matches
        );
    }
}

export default OnScreenKeyboard;

```

---
### `src\ui\powerUpButton.js`
**Type:** js

```js
/**
 * Power-Up Button Component
 *
 * Animated button that appears after 3 consecutive correct answers.
 * Clicking triggers power-up confirmation and transition to next level.
 */

class PowerUpButton {
    constructor() {
        this.element = null;
        this.isVisible = false;
        this.onActivateCallback = null;
    }

    /**
     * Create and show the power-up button
     * @param {Function} onActivate - Callback when button is clicked
     * @returns {HTMLElement} Button element
     */
    show(onActivate) {
        // Remove existing button if any
        this.hide();

        this.onActivateCallback = onActivate;

        // Create button element
        this.element = document.createElement('button');
        this.element.id = 'powerUpBtn';
        this.element.className = 'power-up-btn animate-in';
        this.element.type = 'button';
        this.element.innerHTML = `
            <div class="power-up-content">
                <span class="power-up-icon">⚡</span>
                <span class="power-up-text">Power Up!</span>
                <span class="power-up-subtitle">3 in a row! 🔥</span>
            </div>
        `;

        // Add click handler
        this.element.addEventListener('click', () => {
            this.activate();
        });

        // Add to DOM
        document.body.appendChild(this.element);
        this.isVisible = true;

        // Trigger entrance animation
        setTimeout(() => {
            this.element.classList.add('visible');
        }, 10);

        return this.element;
    }

    /**
     * Hide and remove the power-up button
     */
    hide() {
        if (this.element) {
            this.element.classList.remove('visible');
            this.element.classList.add('animate-out');

            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
                this.element = null;
                this.isVisible = false;
            }, 300);
        }
    }

    /**
     * Handle button activation
     */
    activate() {
        if (!this.onActivateCallback) return;

        // Show custom confirmation dialog
        this.showConfirmation();
    }

    /**
     * Show confirmation dialog for power-up
     */
    showConfirmation() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'power-up-confirmation-overlay';
        overlay.innerHTML = `
            <div class="power-up-confirmation-card">
                <div class="power-up-confirmation-icon">🎉</div>
                <h2>Great Job!</h2>
                <p class="power-up-confirmation-message">
                    You got 3 in a row! Would you like to power up to the next level?
                </p>
                <p class="power-up-confirmation-note">
                    Your progress will be saved and you'll continue with harder questions.
                </p>
                <div class="power-up-confirmation-actions">
                    <button class="power-up-confirmation-btn primary" id="powerUpYesBtn">
                        ⚡ Power Up!
                    </button>
                    <button class="power-up-confirmation-btn secondary" id="powerUpNoBtn">
                        Not Yet
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => overlay.classList.add('visible'), 10);

        // Handle Yes button
        const yesBtn = overlay.querySelector('#powerUpYesBtn');
        yesBtn.addEventListener('click', () => {
            this.confirmPowerUp(overlay);
        });

        // Handle No button
        const noBtn = overlay.querySelector('#powerUpNoBtn');
        noBtn.addEventListener('click', () => {
            this.cancelPowerUp(overlay);
        });
    }

    /**
     * Confirm power-up and proceed
     */
    confirmPowerUp(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);

        // Play activation animation on button
        this.playActivationAnimation();

        // Call the callback after a brief delay
        setTimeout(() => {
            if (this.onActivateCallback) {
                this.onActivateCallback(true);
            }
            this.hide();
        }, 500);
    }

    /**
     * Cancel power-up
     */
    cancelPowerUp(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }

    /**
     * Play activation animation (burst effect)
     */
    playActivationAnimation() {
        if (!this.element) return;

        this.element.classList.add('activating');
    }

    /**
     * Check if button is currently visible
     * @returns {boolean} Visibility status
     */
    isShowing() {
        return this.isVisible;
    }

    /**
     * Update button text (for custom messages)
     * @param {string} text - New button text
     */
    updateText(text) {
        if (this.element) {
            const textElement = this.element.querySelector('.power-up-text');
            if (textElement) {
                textElement.textContent = text;
            }
        }
    }
}

// Export singleton instance
const powerUpButton = new PowerUpButton();
export default powerUpButton;

```

---
### `src\ui\practiceScreen.js`
**Type:** js

```js
/**
 * Practice Screen Component
 *
 * Handles question display, answer collection, and progress tracking.
 * Includes streak tracking and auto power-up system (Phase 3).
 * Tracks module completion progress (Phase 3.5).
 * Integrates with StorageManager for detailed session tracking (Phase 4).
 * Integrates with Adaptive Difficulty Engine for real-time performance monitoring (Phase 5).
 */

import validator from '../core/validator.js';
import OnScreenKeyboard from './onScreenKeyboard.js';
import streakTracker from '../core/streakTracker.js';
import powerUpButton from './powerUpButton.js';
import moduleProgress from '../core/moduleProgress.js';
import moduleCompletionPrompt from './moduleCompletionPrompt.js';
import storageManager from '../core/storageManager.js';
import performanceAnalyzer from '../core/performanceAnalyzer.js';
import adaptiveDifficultyEngine from '../core/adaptiveDifficultyEngine.js';
import confidenceMeter from './confidenceMeter.js';
import adaptiveSuggestionModal from './adaptiveSuggestionModal.js';

class PracticeScreen {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = {
            correct: 0,
            incorrect: 0
        };
        this.startTime = null;
        this.container = null;
        this.currentAnswer = null;
        this.keyboard = null; // On-screen keyboard instance
        this.currentModule = null; // Current module ID (for level-up)
        this.currentLevel = null; // Current difficulty level (for level-up)
        this.leveledUp = false; // Track if student leveled up this session

        // Phase 4: Session tracking
        this.sessionId = null; // Current session ID
        this.questionStartTime = null; // Time when current question was shown
    }

    /**
     * Initialize the practice screen
     * @param {HTMLElement} container - Container element
     * @param {Array} questions - Array of question objects
     * @param {string} moduleId - Current module ID
     * @param {number} level - Current difficulty level
     */
    init(container, questions, moduleId, level) {
        this.container = container;
        this.questions = questions;
        this.currentIndex = 0;
        this.score = { correct: 0, incorrect: 0 };
        this.startTime = Date.now();
        this.currentAnswer = null;
        this.currentModule = moduleId;
        this.currentLevel = level;
        this.leveledUp = false;

        // Reset streak tracker for new session
        streakTracker.resetSession();

        // Phase 4: Create session if student is selected
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            this.sessionId = storageManager.createSession(
                currentStudent.id,
                moduleId,
                level,
                questions.length
            );
            console.log(`✓ Session tracking enabled for: ${currentStudent.name}`);
        } else {
            this.sessionId = null;
            console.log('ℹ No student selected - session tracking disabled');
        }

        // Phase 5: Initialize adaptive system if student is selected
        if (currentStudent) {
            const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);

            // Check if adaptive is enabled for this student
            if (adaptiveProfile && adaptiveProfile.enabled) {
                // Reset and start performance tracking
                performanceAnalyzer.startSession(
                    this.sessionId,
                    currentStudent.id,
                    moduleId,
                    level
                );

                // Reset adaptive engine for new session
                adaptiveDifficultyEngine.resetSession();

                console.log('🎯 Adaptive system: ENABLED for this session');
            } else {
                console.log('🎯 Adaptive system: DISABLED for this student');
            }
        }

        this.render();
        this.showQuestion();
    }

    /**
     * Render the practice screen structure
     */
    render() {
        this.container.innerHTML = `
            <div id="confidenceMeterContainer"></div>

            <div class="practice-header">
                <div class="progress-info">
                    <span class="question-counter">
                        Question <span id="currentQ">1</span> of <span id="totalQ">${this.questions.length}</span>
                    </span>
                    <span class="level-display" id="levelDisplay">${this.getLevelName(this.currentLevel)}</span>
                </div>
                <div class="score-display">
                    <div class="score-item correct">
                        <div class="score-value" id="correctCount">0</div>
                        <div class="score-label">Correct</div>
                    </div>
                    <div class="score-item incorrect">
                        <div class="score-value" id="incorrectCount">0</div>
                        <div class="score-label">Incorrect</div>
                    </div>
                    <div id="streakDisplayContainer"></div>
                </div>
            </div>

            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>

            <div class="question-container">
                <div class="question-card" id="questionCard">
                    <!-- Question content will be inserted here -->
                </div>
            </div>
        `;

        // Phase 5: Initialize and show confidence meter if adaptive is enabled
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);
            if (adaptiveProfile && adaptiveProfile.enabled) {
                const meterContainer = this.container.querySelector('#confidenceMeterContainer');
                confidenceMeter.init(meterContainer);
                confidenceMeter.show();
            }
        }
    }

    /**
     * Show current question
     */
    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.currentAnswer = null;

        // Phase 4: Record question start time for response time tracking
        this.questionStartTime = Date.now();

        // Clean up previous keyboard if exists
        if (this.keyboard) {
            this.keyboard.destroy();
            this.keyboard = null;
        }

        const questionCard = this.container.querySelector('#questionCard');
        questionCard.innerHTML = `
            <div class="question-type">${this.getQuestionTypeLabel(question.type)}</div>
            <div class="question-text">${question.text}</div>
            ${question.hint ? `<div class="question-hint">💡 ${question.hint}</div>` : ''}
            <div class="answer-area" id="answerArea">
                ${this.renderAnswerArea(question)}
            </div>
            <div class="feedback-area" id="feedbackArea"></div>
        `;

        this.attachAnswerListeners(question);
        this.updateProgress();
    }

    /**
     * Get question type label
     */
    getQuestionTypeLabel(type) {
        const labels = {
            'multiple_choice': 'Multiple Choice',
            'text_input': 'Type Your Answer'
        };
        return labels[type] || 'Question';
    }

    /**
     * Get formatted level name
     * @param {number} level - Difficulty level (1-4)
     * @returns {string} Formatted level display (e.g., "Level 1 (Beginning)")
     */
    getLevelName(level) {
        const levelNames = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };
        const name = levelNames[level] || 'Unknown';
        return `Level ${level} (${name})`;
    }

    /**
     * Render answer area based on question type
     */
    renderAnswerArea(question) {
        if (question.type === 'multiple_choice') {
            return `
                <div class="answer-options">
                    ${question.options.map(option => `
                        <button class="answer-btn" data-answer="${option}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
        } else if (question.type === 'text_input') {
            const isTouchDevice = OnScreenKeyboard.isTouchDevice();

            if (isTouchDevice) {
                // Use custom display div for touch devices (avoids readonly conflicts)
                return `
                    <div class="keyboard-display"
                         id="textAnswer"
                         role="textbox"
                         aria-label="Answer input"
                         tabindex="0"
                         data-placeholder="Tap keyboard to enter answer">
                    </div>
                    <button class="submit-btn" id="submitBtn">Submit Answer</button>
                    <div id="keyboardContainer"></div>
                `;
            } else {
                // Use native input for desktop
                return `
                    <input type="text"
                           class="text-input"
                           id="textAnswer"
                           placeholder="Type your answer here"
                           autocomplete="off">
                    <button class="submit-btn" id="submitBtn">Submit Answer</button>
                `;
            }
        }
        return '';
    }

    /**
     * Attach event listeners for answer interaction
     */
    attachAnswerListeners(question) {
        if (question.type === 'multiple_choice') {
            const answerBtns = this.container.querySelectorAll('.answer-btn');
            answerBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const answer = btn.dataset.answer;
                    this.submitAnswer(answer);
                });
            });
        } else if (question.type === 'text_input') {
            const textAnswer = this.container.querySelector('#textAnswer');
            const submitBtn = this.container.querySelector('#submitBtn');
            const isTouchDevice = OnScreenKeyboard.isTouchDevice();

            // Submit handler - gets value from keyboard or input depending on device
            const handleSubmit = () => {
                const answer = isTouchDevice
                    ? this.keyboard.getValue()  // Get from keyboard internal value
                    : textAnswer.value;         // Get from native input
                this.submitAnswer(answer);
            };

            submitBtn.addEventListener('click', handleSubmit);

            if (isTouchDevice) {
                // Initialize on-screen keyboard for touch devices
                const keyboardContainer = this.container.querySelector('#keyboardContainer');
                this.keyboard = new OnScreenKeyboard();
                const keyboardElement = this.keyboard.create(textAnswer, handleSubmit);
                keyboardContainer.appendChild(keyboardElement);
                this.keyboard.show();

                // Listen for keyboard submit event
                textAnswer.addEventListener('keyboardSubmit', handleSubmit);

                // Allow clicking on display to focus
                textAnswer.addEventListener('click', () => {
                    textAnswer.focus();
                });
            } else {
                // Desktop: use native input with Enter key support
                textAnswer.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                });

                // Focus input for desktop
                textAnswer.focus();
            }
        }
    }

    /**
     * Submit answer for validation
     */
    submitAnswer(answer) {
        if (!answer || answer.trim() === '') {
            alert('Please provide an answer!');
            return;
        }

        this.currentAnswer = answer;
        const question = this.questions[this.currentIndex];
        const result = validator.validate(question, answer);

        // Phase 4: Calculate response time
        const responseTimeMs = this.questionStartTime
            ? Date.now() - this.questionStartTime
            : null;

        // Update score
        if (result.isCorrect) {
            this.score.correct++;
            // Track correct answer for module progress (Phase 3.5)
            moduleProgress.recordCorrectAnswer(this.currentModule, this.currentLevel);
        } else {
            this.score.incorrect++;
        }

        // Track streak (Phase 3)
        const streakStatus = streakTracker.recordAnswer(result.isCorrect);

        // Phase 4: Record question result in session
        if (this.sessionId) {
            storageManager.recordQuestionResult(this.sessionId, {
                correct: result.isCorrect,
                timeMs: responseTimeMs,
                question: question.text,
                answer: answer,
                type: question.type
            });

            // Update best streak
            storageManager.updateBestStreak(this.sessionId, streakStatus.currentStreak);
        }

        // Phase 5: Record result in performance analyzer
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);
            if (adaptiveProfile && adaptiveProfile.enabled && performanceAnalyzer.sessionId) {
                // Record question result
                performanceAnalyzer.recordResult({
                    correct: result.isCorrect,
                    timeMs: responseTimeMs,
                    questionText: question.text,
                    answer: answer
                });

                // Update confidence meter
                const confidenceData = adaptiveDifficultyEngine.calculateConfidenceScore();
                confidenceMeter.update(confidenceData);

                // Check for intervention (after showing feedback)
                const questionsAnswered = this.score.correct + this.score.incorrect;
                setTimeout(() => {
                    this.checkForAdaptiveIntervention(questionsAnswered);
                }, 1500); // After feedback is shown
            }
        }

        this.showFeedback(result, streakStatus);
        this.disableAnswerInputs();
        this.updateProgress();
        this.updateStreakDisplay();

        // Show power-up button if available (not at max level)
        if (streakStatus.justUnlocked && this.currentLevel < 4) {
            setTimeout(() => {
                powerUpButton.show(() => this.handlePowerUp());
            }, 800); // Brief delay for better UX
        }

        // At Level 4 with 3-streak: offer to complete module and end session
        if (streakStatus.justUnlocked && this.currentLevel === 4) {
            // Check if module would be complete
            if (moduleProgress.isModuleComplete(this.currentModule)) {
                setTimeout(() => {
                    this.showLevel4CompletionOffer();
                }, 800);
            }
        }

        // Hide power-up button if streak was lost
        if (streakStatus.lostPowerUp) {
            powerUpButton.hide();
        }
    }

    /**
     * Show feedback after answer submission
     */
    showFeedback(result) {
        const feedbackArea = this.container.querySelector('#feedbackArea');

        if (result.isCorrect) {
            feedbackArea.innerHTML = `
                <div class="feedback feedback-correct">
                    <span class="feedback-icon">✓</span>
                    <span class="feedback-text">Correct! Well done!</span>
                </div>
                <button class="next-btn" id="nextBtn">Next Question →</button>
            `;
        } else {
            feedbackArea.innerHTML = `
                <div class="feedback feedback-incorrect">
                    <span class="feedback-icon">✗</span>
                    <span class="feedback-text">Not quite. The correct answer is: <strong>${result.correctAnswer}</strong></span>
                </div>
                <button class="next-btn" id="nextBtn">Next Question →</button>
            `;
        }

        // Highlight correct answer in multiple choice
        if (this.questions[this.currentIndex].type === 'multiple_choice') {
            const answerBtns = this.container.querySelectorAll('.answer-btn');
            answerBtns.forEach(btn => {
                const btnAnswer = btn.dataset.answer;
                if (btnAnswer === this.questions[this.currentIndex].answer) {
                    btn.classList.add('correct');
                } else if (btnAnswer === this.currentAnswer) {
                    btn.classList.add('incorrect');
                }
            });
        }

        // Attach next button listener
        const nextBtn = this.container.querySelector('#nextBtn');
        nextBtn.addEventListener('click', () => {
            this.nextQuestion();
        });
    }

    /**
     * Disable answer inputs after submission
     */
    disableAnswerInputs() {
        const answerBtns = this.container.querySelectorAll('.answer-btn');
        answerBtns.forEach(btn => btn.disabled = true);

        const textInput = this.container.querySelector('#textAnswer');
        if (textInput) textInput.disabled = true;

        const submitBtn = this.container.querySelector('#submitBtn');
        if (submitBtn) submitBtn.disabled = true;

        // Disable on-screen keyboard if active
        if (this.keyboard) {
            this.keyboard.disable();
        }
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            this.finish();
        } else {
            this.showQuestion();
        }
    }

    /**
     * Update progress display
     */
    updateProgress() {
        this.container.querySelector('#currentQ').textContent = this.currentIndex + 1;
        this.container.querySelector('#totalQ').textContent = this.questions.length;
        this.container.querySelector('#correctCount').textContent = this.score.correct;
        this.container.querySelector('#incorrectCount').textContent = this.score.incorrect;

        const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
        this.container.querySelector('#progressFill').style.width = `${progress}%`;

        // Update level display
        const levelDisplay = this.container.querySelector('#levelDisplay');
        if (levelDisplay) {
            levelDisplay.textContent = this.getLevelName(this.currentLevel);
        }
    }

    /**
     * Update streak display in header
     */
    updateStreakDisplay() {
        const container = this.container.querySelector('#streakDisplayContainer');
        if (!container) return;

        const status = streakTracker.getStatus();
        const streak = status.currentStreak;

        // Only show streak when 2+ correct (a real streak!)
        if (streak < 2) {
            container.innerHTML = '';
            return;
        }

        const isHot = streakTracker.isHotStreak();
        const hotClass = isHot ? 'hot' : '';

        container.innerHTML = `
            <div class="streak-display ${hotClass}">
                <span class="streak-icon">🔥</span>
                <span class="streak-count">${streak} in a row!</span>
            </div>
        `;
    }

    /**
     * Handle power-up when power-up button is activated
     */
    handlePowerUp() {
        // Consume the power-up
        streakTracker.consumePowerUp();

        // Mark that we powered up
        this.leveledUp = true;
        const newLevel = Math.min(this.currentLevel + 1, 4);

        // Phase 4: Record power-up in session
        if (this.sessionId) {
            storageManager.recordPowerUp(this.sessionId);
        }

        // Show celebration overlay
        this.showPowerUpOverlay(this.currentLevel, newLevel);

        // After celebration, continue with new level questions
        setTimeout(() => {
            this.transitionToNewLevel(newLevel);
        }, 3000);
    }

    /**
     * Show power-up celebration overlay
     */
    showPowerUpOverlay(oldLevel, newLevel) {
        const overlay = document.createElement('div');
        overlay.className = 'power-up-overlay';
        overlay.innerHTML = `
            <div class="power-up-card">
                <div class="power-up-icon">🎉</div>
                <h2>Power Up!</h2>
                <p>Level ${oldLevel} → Level ${newLevel}</p>
                <p class="power-up-subtitle">Get ready for harder questions!</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 3000);
    }

    /**
     * Transition to new difficulty level
     */
    transitionToNewLevel(newLevel) {
        // Update current level
        this.currentLevel = newLevel;

        // Calculate how many questions remain
        const questionsRemaining = this.questions.length - (this.currentIndex + 1);

        // Generate new questions at higher level
        const questionEngine = window.questionEngine; // Access global instance
        if (!questionEngine) {
            console.error('Question engine not available');
            return;
        }

        const newQuestions = questionEngine.generate(
            this.currentModule,
            newLevel,
            questionsRemaining
        );

        // Replace remaining questions with new level questions
        this.questions = [
            ...this.questions.slice(0, this.currentIndex + 1),
            ...newQuestions
        ];

        // Continue to next question (which will be at new level)
        this.nextQuestion();
    }

    /**
     * Show Level 4 completion offer (3-streak at max level)
     */
    showLevel4CompletionOffer() {
        // Get module info
        import('../curriculum/modules.js').then(({ MODULES }) => {
            const module = MODULES[this.currentModule];
            if (!module) return;

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'level4-completion-overlay';
            overlay.innerHTML = `
                <div class="level4-completion-card">
                    <div class="level4-completion-icon">🏆</div>
                    <h2>Outstanding!</h2>
                    <p class="level4-completion-message">
                        You've got 3 in a row at the highest level!
                    </p>
                    <p class="level4-completion-module">
                        ${module.icon} ${module.name}
                    </p>
                    <p class="level4-completion-note">
                        You've mastered this module. Would you like to complete it now?
                    </p>
                    <div class="level4-completion-actions">
                        <button class="level4-completion-btn primary" id="level4CompleteBtn">
                            🏆 Complete Module
                        </button>
                        <button class="level4-completion-btn secondary" id="level4ContinueBtn">
                            Keep Practicing
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            // Animate in
            setTimeout(() => overlay.classList.add('visible'), 10);

            // Handle Complete button
            const completeBtn = overlay.querySelector('#level4CompleteBtn');
            completeBtn.addEventListener('click', () => {
                this.confirmLevel4Completion(overlay);
            });

            // Handle Continue button
            const continueBtn = overlay.querySelector('#level4ContinueBtn');
            continueBtn.addEventListener('click', () => {
                this.cancelLevel4Completion(overlay);
            });
        });
    }

    /**
     * Confirm Level 4 completion and end session
     */
    confirmLevel4Completion(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);

        // Mark module as complete
        moduleProgress.markModuleComplete(this.currentModule);

        // End the session
        this.finish();
    }

    /**
     * Cancel Level 4 completion and continue
     */
    cancelLevel4Completion(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }

    /**
     * Check for adaptive intervention (Phase 5)
     * @param {number} questionsAnswered - Total questions answered so far
     */
    checkForAdaptiveIntervention(questionsAnswered) {
        // Don't check if modal is already showing or if power-up is active
        if (adaptiveSuggestionModal.isShowing() || powerUpButton.isVisible()) {
            return;
        }

        // Check for intervention
        const intervention = adaptiveDifficultyEngine.checkForIntervention(questionsAnswered);

        if (intervention) {
            const currentStudent = storageManager.getCurrentStudent();

            // Show suggestion modal
            adaptiveSuggestionModal.show(
                intervention,
                this.sessionId,
                currentStudent.id,
                (suggestedLevel) => this.handleAdaptiveAccept(intervention, suggestedLevel),
                () => this.handleAdaptiveDecline(intervention)
            );
        }
    }

    /**
     * Handle student accepting adaptive suggestion
     * @param {Object} intervention - Intervention data
     * @param {number} suggestedLevel - Suggested difficulty level
     */
    handleAdaptiveAccept(intervention, suggestedLevel) {
        if (intervention.type === 'switch_module') {
            // For module switch, end current session and return to setup
            console.log('🎯 Student accepted module switch suggestion');
            this.finish();
            return;
        }

        // For level change (increase or decrease)
        console.log(`🎯 Student accepted level change: L${this.currentLevel} → L${suggestedLevel}`);

        // Show transition overlay
        this.showAdaptiveLevelChangeOverlay(this.currentLevel, suggestedLevel, intervention.type);

        // After animation, transition to new level
        setTimeout(() => {
            this.transitionToNewLevel(suggestedLevel);
        }, 2500);
    }

    /**
     * Handle student declining adaptive suggestion
     * @param {Object} intervention - Intervention data
     */
    handleAdaptiveDecline(intervention) {
        console.log('🎯 Student declined adaptive suggestion');
        // Just continue with current level - no action needed
    }

    /**
     * Show adaptive level change overlay
     * @param {number} oldLevel - Current level
     * @param {number} newLevel - New level
     * @param {string} type - Intervention type ('increase' or 'decrease')
     */
    showAdaptiveLevelChangeOverlay(oldLevel, newLevel, type) {
        const overlay = document.createElement('div');
        overlay.className = 'power-up-overlay'; // Reuse power-up overlay styles

        const icon = type === 'increase' ? '🌟' : '🤝';
        const title = type === 'increase' ? 'Challenge Accepted!' : 'Good Choice!';
        const message = type === 'increase'
            ? 'Get ready for harder questions!'
            : 'Let\'s build your confidence!';

        overlay.innerHTML = `
            <div class="power-up-card">
                <div class="power-up-icon">${icon}</div>
                <h2>${title}</h2>
                <p>Level ${oldLevel} → Level ${newLevel}</p>
                <p class="power-up-subtitle">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 2500);
    }

    /**
     * Finish practice session
     */
    finish() {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.startTime) / 1000); // seconds

        // Check if module just became complete (Phase 3.5)
        const moduleComplete = moduleProgress.isModuleComplete(this.currentModule);
        const alreadyMarkedComplete = moduleProgress.getProgress(this.currentModule).completed;

        // Calculate final score
        const totalQuestions = this.score.correct + this.score.incorrect;
        const percentage = totalQuestions > 0
            ? Math.round((this.score.correct / totalQuestions) * 100)
            : 0;

        const finalScore = {
            correct: this.score.correct,
            total: totalQuestions,
            percentage: percentage
        };

        // Phase 4: Complete session in storage
        if (this.sessionId) {
            const completedEarly = (this.currentIndex + 1 < this.questions.length); // Level 4 early completion
            storageManager.completeSession(this.sessionId, finalScore, completedEarly);
            console.log(`✓ Session completed: ${finalScore.correct}/${finalScore.total} (${finalScore.percentage}%)`);
        }

        // Phase 5: Clean up adaptive system
        if (performanceAnalyzer.sessionId) {
            performanceAnalyzer.endSession();
        }
        confidenceMeter.hide();

        const sessionData = {
            questions: this.questions,
            score: this.score,
            timeSpent: timeSpent,
            totalQuestions: totalQuestions, // Use actual attempted count, not generated count
            leveledUp: this.leveledUp,
            finalLevel: this.currentLevel,
            moduleComplete: moduleComplete
        };

        // Show module completion prompt if just completed
        if (moduleComplete && !alreadyMarkedComplete) {
            // Import module info
            import('../curriculum/modules.js').then(({ MODULES }) => {
                const module = MODULES[this.currentModule];
                if (module) {
                    setTimeout(() => {
                        moduleCompletionPrompt.show(
                            this.currentModule,
                            module.name,
                            module.icon
                        );
                    }, 500); // Brief delay after results screen
                }
            });
        }

        // Dispatch custom event
        const event = new CustomEvent('practiceComplete', {
            detail: sessionData
        });
        document.dispatchEvent(event);
    }

    /**
     * Show the screen
     */
    show() {
        this.container.classList.remove('hidden');
    }

    /**
     * Hide the screen
     */
    hide() {
        this.container.classList.add('hidden');
    }
}

export default PracticeScreen;

```

---
### `src\ui\progressDisplay.js`
**Type:** js

```js
/**
 * Progress Display Component
 *
 * Dashboard showing detailed student progress, statistics, and data management.
 * Part of Phase 4: Progress Persistence
 *
 * Features:
 * - Overall statistics
 * - Recent session history
 * - Per-module progress breakdown
 * - Performance trends
 * - Export/import data
 * - Data management tools
 */

import storageManager from '../core/storageManager.js';
import { MODULES } from '../curriculum/modules.js';

class ProgressDisplay {
    constructor() {
        this.element = null;
        this.currentStudentId = null;
    }

    /**
     * Show progress dashboard for current student
     */
    show() {
        const currentStudent = storageManager.getCurrentStudent();
        if (!currentStudent) {
            alert('No student selected.\n\nPlease select a student to view progress.');
            return;
        }

        this.currentStudentId = currentStudent.id;

        // Create overlay if it doesn't exist
        if (!this.element) {
            this.createElement();
        }

        this.render();
        document.body.appendChild(this.element);

        // Animate in
        setTimeout(() => this.element.classList.add('visible'), 10);
    }

    /**
     * Hide progress dashboard
     */
    hide() {
        if (!this.element) return;

        this.element.classList.remove('visible');
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, 300);
    }

    /**
     * Create the overlay element
     */
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'progress-dashboard-overlay';
    }

    /**
     * Render the progress dashboard
     */
    render() {
        const student = storageManager.getStudent(this.currentStudentId);
        const stats = storageManager.getStudentStats(this.currentStudentId);

        this.element.innerHTML = `
            <div class="progress-dashboard-card">
                <div class="progress-dashboard-header">
                    <div class="dashboard-title-section">
                        <h2>📊 Progress Dashboard</h2>
                        <div class="dashboard-student-name">${this.escapeHtml(student.name)}</div>
                    </div>
                    <button class="close-btn" id="closeDashboard" aria-label="Close">×</button>
                </div>

                <div class="progress-dashboard-body">
                    ${this.renderOverallStats(stats)}
                    ${this.renderModuleProgress(student)}
                    ${this.renderRecentSessions(stats)}
                    ${this.renderDataManagement()}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    /**
     * Render overall statistics section
     */
    renderOverallStats(stats) {
        const lastActiveDate = new Date(stats.lastActive);
        const avgTimeFormatted = this.formatDuration(stats.averageSessionTime);

        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Overall Statistics</h3>
                <div class="dashboard-stats-grid">
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">📚</div>
                        <div class="dashboard-stat-value">${stats.totalSessions}</div>
                        <div class="dashboard-stat-label">Total Sessions</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">✅</div>
                        <div class="dashboard-stat-value">${stats.totalQuestions}</div>
                        <div class="dashboard-stat-label">Questions Answered</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">🎯</div>
                        <div class="dashboard-stat-value">${stats.overallAccuracy}%</div>
                        <div class="dashboard-stat-label">Overall Accuracy</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">⚡</div>
                        <div class="dashboard-stat-value">${stats.totalPowerUps}</div>
                        <div class="dashboard-stat-label">Power-Ups Used</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">🔥</div>
                        <div class="dashboard-stat-value">${stats.bestStreak}</div>
                        <div class="dashboard-stat-label">Best Streak</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">🏆</div>
                        <div class="dashboard-stat-value">${stats.completedModules}/4</div>
                        <div class="dashboard-stat-label">Modules Complete</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">⏱️</div>
                        <div class="dashboard-stat-value">${avgTimeFormatted}</div>
                        <div class="dashboard-stat-label">Avg Session Time</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">📅</div>
                        <div class="dashboard-stat-value">${lastActiveDate.toLocaleDateString()}</div>
                        <div class="dashboard-stat-label">Last Active</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render module progress breakdown
     */
    renderModuleProgress(student) {
        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Module Progress</h3>
                <div class="dashboard-modules-grid">
                    ${Object.values(MODULES).map(module => {
                        const progress = student.moduleProgress[module.id] || {
                            completed: false,
                            levels: { 1: 0, 2: 0, 3: 0, 4: 0 }
                        };

                        const performance = storageManager.getPerformanceWindow(
                            student.id,
                            module.id,
                            this.getHighestAttemptedLevel(progress.levels)
                        );

                        const recommendedLevel = storageManager.getRecommendedLevel(
                            student.id,
                            module.id
                        );

                        return `
                            <div class="dashboard-module-card ${progress.completed ? 'completed' : ''}">
                                <div class="dashboard-module-header">
                                    <div class="dashboard-module-icon">${module.icon}</div>
                                    <div class="dashboard-module-info">
                                        <div class="dashboard-module-name">${module.name}</div>
                                        ${progress.completed ? '<div class="dashboard-module-badge">🏆 Complete</div>' : ''}
                                    </div>
                                </div>

                                <div class="dashboard-module-levels">
                                    ${[1, 2, 3, 4].map(level => {
                                        const count = progress.levels[level] || 0;
                                        const isComplete = count >= 3;
                                        const isRecommended = level === recommendedLevel;

                                        return `
                                            <div class="dashboard-level-item ${isComplete ? 'complete' : ''} ${isRecommended ? 'recommended' : ''}">
                                                <span class="dashboard-level-label">L${level}</span>
                                                <span class="dashboard-level-bar">
                                                    <span class="dashboard-level-fill" style="width: ${Math.min((count / 3) * 100, 100)}%"></span>
                                                </span>
                                                <span class="dashboard-level-count">${count}/3</span>
                                                ${isRecommended ? '<span class="dashboard-level-rec">💡</span>' : ''}
                                            </div>
                                        `;
                                    }).join('')}
                                </div>

                                ${performance.sessionCount > 0 ? `
                                    <div class="dashboard-module-stats">
                                        <span class="module-stat">
                                            <span class="module-stat-label">Recent:</span>
                                            <span class="module-stat-value ${this.getTrendClass(performance.trend)}">${performance.averageAccuracy}%</span>
                                        </span>
                                        <span class="module-stat">
                                            <span class="module-stat-label">Trend:</span>
                                            <span class="module-stat-value ${this.getTrendClass(performance.trend)}">${this.getTrendIcon(performance.trend)}</span>
                                        </span>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render recent sessions section
     */
    renderRecentSessions(stats) {
        const sessions = stats.recentSessions;

        if (sessions.length === 0) {
            return `
                <div class="dashboard-section">
                    <h3 class="dashboard-section-title">Recent Sessions</h3>
                    <div class="dashboard-empty-state">
                        <p>No practice sessions yet. Start practicing to see your history!</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Recent Sessions</h3>
                <div class="dashboard-sessions-list">
                    ${sessions.map(session => {
                        const module = MODULES[session.moduleId];
                        const date = new Date(session.completedAt);
                        const duration = this.formatDuration(session.duration);
                        const accuracy = session.finalScore.percentage;

                        return `
                            <div class="dashboard-session-item">
                                <div class="dashboard-session-module">
                                    <span class="session-module-icon">${module ? module.icon : '📚'}</span>
                                    <div class="session-module-info">
                                        <div class="session-module-name">${module ? module.name : 'Unknown'}</div>
                                        <div class="session-module-meta">
                                            Level ${session.level} • ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                                <div class="dashboard-session-stats">
                                    <div class="session-stat">
                                        <span class="session-stat-label">Score</span>
                                        <span class="session-stat-value">${session.finalScore.correct}/${session.finalScore.total}</span>
                                    </div>
                                    <div class="session-stat">
                                        <span class="session-stat-label">Accuracy</span>
                                        <span class="session-stat-value ${this.getAccuracyClass(accuracy)}">${accuracy}%</span>
                                    </div>
                                    <div class="session-stat">
                                        <span class="session-stat-label">Time</span>
                                        <span class="session-stat-value">${duration}</span>
                                    </div>
                                    ${session.powerUpsUsed > 0 ? `
                                        <div class="session-stat">
                                            <span class="session-stat-label">Power-Ups</span>
                                            <span class="session-stat-value">⚡ ${session.powerUpsUsed}</span>
                                        </div>
                                    ` : ''}
                                    ${session.streakBest > 0 ? `
                                        <div class="session-stat">
                                            <span class="session-stat-label">Best Streak</span>
                                            <span class="session-stat-value">🔥 ${session.streakBest}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render data management section
     */
    renderDataManagement() {
        const storageInfo = storageManager.getStorageInfo();

        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Data Management</h3>

                <div class="dashboard-storage-info">
                    <div class="storage-info-item">
                        <span class="storage-info-label">Storage Used:</span>
                        <span class="storage-info-value">${storageInfo.sizeInKB} KB (${storageInfo.percentUsed}%)</span>
                    </div>
                    <div class="storage-info-item">
                        <span class="storage-info-label">Sessions Stored:</span>
                        <span class="storage-info-value">${storageInfo.sessionCount}</span>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <button class="dashboard-action-btn primary" id="exportDataBtn">
                        💾 Export My Data
                    </button>
                    <button class="dashboard-action-btn secondary" id="importDataBtn">
                        📥 Import Data
                    </button>
                    <button class="dashboard-action-btn secondary" id="viewStorageBtn">
                        📊 Storage Details
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('#closeDashboard');
        closeBtn.addEventListener('click', () => this.hide());

        // Export data
        const exportBtn = this.element.querySelector('#exportDataBtn');
        exportBtn.addEventListener('click', () => this.exportData());

        // Import data
        const importBtn = this.element.querySelector('#importDataBtn');
        importBtn.addEventListener('click', () => this.importData());

        // Storage details
        const storageBtn = this.element.querySelector('#viewStorageBtn');
        storageBtn.addEventListener('click', () => this.viewStorageDetails());
    }

    /**
     * Export student data
     */
    exportData() {
        const student = storageManager.getStudent(this.currentStudentId);
        const jsonData = storageManager.exportData(this.currentStudentId);

        if (!jsonData) {
            alert('Failed to export data.');
            return;
        }

        // Create download
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `maths-practice-${student.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showFeedback('Data exported successfully! 💾');
    }

    /**
     * Import student data
     */
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json,.json';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const result = storageManager.importData(event.target.result, { merge: true });

                    if (result.success) {
                        this.showFeedback(`✓ Imported: ${result.stats.students} student(s), ${result.stats.sessions} session(s)`);

                        // Refresh dashboard
                        setTimeout(() => {
                            this.render();
                        }, 2000);
                    } else {
                        alert(`Import failed: ${result.message}`);
                    }
                } catch (error) {
                    alert(`Import failed: ${error.message}`);
                }
            };

            reader.readAsText(file);
        });

        input.click();
    }

    /**
     * View storage details
     */
    viewStorageDetails() {
        const info = storageManager.getStorageInfo();

        let message = `📊 Storage Details\n\n`;
        message += `Size: ${info.sizeInKB} KB (${info.sizeInMB} MB)\n`;
        message += `Usage: ${info.percentUsed}% of ~5MB limit\n\n`;
        message += `Students: ${info.studentCount}\n`;
        message += `Sessions: ${info.sessionCount}\n\n`;

        if (info.oldestSession) {
            const oldest = new Date(info.oldestSession);
            message += `Oldest session: ${oldest.toLocaleDateString()}\n`;
        }
        if (info.newestSession) {
            const newest = new Date(info.newestSession);
            message += `Newest session: ${newest.toLocaleDateString()}\n`;
        }

        message += `\nSessions older than 30 days are automatically cleaned up.`;

        alert(message);
    }

    /**
     * Show feedback message
     */
    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'dashboard-feedback';
        feedback.textContent = message;

        this.element.appendChild(feedback);

        setTimeout(() => feedback.classList.add('visible'), 10);
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    /**
     * Helper: Get highest attempted level
     */
    getHighestAttemptedLevel(levels) {
        for (let i = 4; i >= 1; i--) {
            if (levels[i] > 0) return i;
        }
        return 1;
    }

    /**
     * Helper: Get trend class for styling
     */
    getTrendClass(trend) {
        const classes = {
            'improving': 'trend-improving',
            'stable': 'trend-stable',
            'declining': 'trend-declining',
            'insufficient_data': 'trend-neutral'
        };
        return classes[trend] || 'trend-neutral';
    }

    /**
     * Helper: Get trend icon
     */
    getTrendIcon(trend) {
        const icons = {
            'improving': '📈',
            'stable': '➡️',
            'declining': '📉',
            'insufficient_data': '—'
        };
        return icons[trend] || '—';
    }

    /**
     * Helper: Get accuracy class for styling
     */
    getAccuracyClass(accuracy) {
        if (accuracy >= 80) return 'accuracy-high';
        if (accuracy >= 60) return 'accuracy-medium';
        return 'accuracy-low';
    }

    /**
     * Helper: Format duration
     */
    formatDuration(ms) {
        if (!ms || ms === 0) return '—';

        const seconds = Math.floor(ms / 1000);
        if (seconds < 60) return `${seconds}s`;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    /**
     * Helper: Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
const progressDisplay = new ProgressDisplay();
export default progressDisplay;

```

---
### `src\ui\resultsScreen.js`
**Type:** js

```js
/**
 * Results Screen Component
 *
 * Displays practice session results and performance feedback
 */

class ResultsScreen {
    constructor() {
        this.container = null;
        this.sessionData = null;
    }

    /**
     * Initialize the results screen
     * @param {HTMLElement} container - Container element
     * @param {Object} sessionData - Session results data
     */
    init(container, sessionData) {
        this.container = container;
        this.sessionData = sessionData;
        this.render();
        this.attachEventListeners();
    }

    /**
     * Render the results screen
     */
    render() {
        const { score, totalQuestions, timeSpent } = this.sessionData;
        const percentage = Math.round((score.correct / totalQuestions) * 100);
        const performanceData = this.getPerformanceData(percentage);

        this.container.innerHTML = `
            <div class="results-container">
                <div class="results-icon">${performanceData.emoji}</div>

                <h1 class="results-title">Practice Complete!</h1>

                <div class="results-stats">
                    <div class="stat-card primary">
                        <div class="stat-value">${score.correct}/${totalQuestions}</div>
                        <div class="stat-label">Score</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.formatTime(timeSpent)}</div>
                        <div class="stat-label">Time Spent</div>
                    </div>
                </div>

                <div class="performance-card ${performanceData.class}">
                    <h2 class="performance-title">${performanceData.title}</h2>
                    <p class="performance-message">${performanceData.message}</p>
                </div>

                <div class="results-details">
                    <div class="detail-item">
                        <span class="detail-icon">✓</span>
                        <span class="detail-text">${score.correct} correct answers</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">✗</span>
                        <span class="detail-text">${score.incorrect} incorrect answers</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">📊</span>
                        <span class="detail-text">${totalQuestions} questions completed</span>
                    </div>
                </div>

                <div class="results-actions">
                    <button class="action-btn primary" id="practiceAgainBtn">
                        Practice Again
                    </button>
                    <button class="action-btn secondary" id="changeTopicBtn">
                        Change Topic
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Get performance feedback data based on percentage
     */
    getPerformanceData(percentage) {
        if (percentage >= 90) {
            return {
                emoji: '🌟',
                title: 'Outstanding!',
                message: "You're a maths superstar! Keep up the excellent work!",
                class: 'performance-excellent'
            };
        } else if (percentage >= 70) {
            return {
                emoji: '🎉',
                title: 'Great Job!',
                message: "You're doing really well! Keep practicing to improve even more!",
                class: 'performance-good'
            };
        } else if (percentage >= 50) {
            return {
                emoji: '👍',
                title: 'Good Effort!',
                message: "You're making progress! Try again to improve your score!",
                class: 'performance-okay'
            };
        } else {
            return {
                emoji: '💪',
                title: 'Keep Trying!',
                message: "Practice makes perfect! Have another go and you'll do better!",
                class: 'performance-needs-work'
            };
        }
    }

    /**
     * Format time in seconds to readable format
     */
    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const practiceAgainBtn = this.container.querySelector('#practiceAgainBtn');
        const changeTopicBtn = this.container.querySelector('#changeTopicBtn');

        practiceAgainBtn.addEventListener('click', () => {
            this.practiceAgain();
        });

        changeTopicBtn.addEventListener('click', () => {
            this.changeTopic();
        });
    }

    /**
     * Handle practice again action
     */
    practiceAgain() {
        const event = new CustomEvent('practiceAgain');
        document.dispatchEvent(event);
    }

    /**
     * Handle change topic action
     */
    changeTopic() {
        const event = new CustomEvent('changeTopic');
        document.dispatchEvent(event);
    }

    /**
     * Show the screen
     */
    show() {
        this.container.classList.remove('hidden');
    }

    /**
     * Hide the screen
     */
    hide() {
        this.container.classList.add('hidden');
    }
}

export default ResultsScreen;

```

---
### `src\ui\setupScreen.js`
**Type:** js

```js
/**
 * Setup Screen Component
 *
 * Handles topic selection, difficulty level, and practice session configuration.
 * Integrates with student management and progress tracking (Phase 4).
 */

import { MODULES, getModule } from '../curriculum/modules.js';
import questionEngine from '../core/questionEngine.js';
import questionHistory from '../core/questionHistory.js';
import moduleProgress from '../core/moduleProgress.js';
import storageManager from '../core/storageManager.js';
import studentSelector from './studentSelector.js';
import progressDisplay from './progressDisplay.js';

class SetupScreen {
    constructor() {
        this.selectedModule = null;
        this.selectedLevel = 3; // Default: Meeting
        this.questionCount = 5; // Default: 5 questions
        this.container = null;
        this.lastSession = null; // Remember last selections
    }

    /**
     * Initialize the setup screen
     * @param {HTMLElement} container - Container element
     */
    init(container) {
        this.container = container;
        this.render();
        this.attachEventListeners();

        // Listen for module completion events (Phase 3.5)
        document.addEventListener('moduleCompleted', () => {
            this.refreshTopics();
        });
    }

    /**
     * Render the setup screen
     */
    render() {
        this.container.innerHTML = `
            <div class="setup-header">
                <h1>Maths Practice</h1>
                <p class="subtitle">Choose your topic and difficulty to start practicing!</p>
            </div>

            ${this.renderStudentSection()}

            <div class="setup-section">
                <h2 class="section-title">📚 Choose a Topic</h2>
                <div class="topic-grid" id="topicGrid">
                    ${this.renderTopics()}
                </div>
            </div>

            <div class="setup-section">
                <h2 class="section-title">🎯 Choose Difficulty</h2>
                <div class="level-grid" id="levelGrid">
                    ${this.renderLevels()}
                </div>
            </div>

            <div class="setup-section">
                <h2 class="section-title">⚙️ Settings</h2>
                <div class="settings-group">
                    <label for="questionCount">Number of Questions:</label>
                    <div class="input-group">
                        <button class="input-btn" id="decreaseBtn">−</button>
                        <input type="number"
                               id="questionCount"
                               min="1"
                               max="20"
                               value="${this.questionCount}">
                        <button class="input-btn" id="increaseBtn">+</button>
                    </div>
                </div>

                <div class="settings-group" style="margin-top: 1rem;">
                    <label for="cooldownPeriod">Question Cooldown:</label>
                    <select id="cooldownPeriod" class="cooldown-select">
                        ${this.renderCooldownOptions()}
                    </select>
                    <span class="cooldown-info">🔄 Prevents seeing same questions</span>
                </div>

                ${this.renderAdaptiveControls()}

                <div class="settings-actions" style="margin-top: 1rem;">
                    <button class="settings-btn" id="clearHistoryBtn" title="Clear question history">
                        🗑️ Clear History
                    </button>
                    <button class="settings-btn" id="viewStatsBtn" title="View history statistics">
                        📊 View Stats
                    </button>
                </div>
            </div>

            <button class="start-btn" id="startBtn" disabled>
                Start Practice
            </button>
        `;
    }

    /**
     * Render student selection section (Phase 4)
     */
    renderStudentSection() {
        const currentStudent = storageManager.getCurrentStudent();

        if (currentStudent) {
            const stats = storageManager.getStudentStats(currentStudent.id);

            return `
                <div class="student-info-section">
                    <div class="student-info-card">
                        <div class="student-info-main">
                            <div class="student-avatar">👤</div>
                            <div class="student-details">
                                <div class="student-display-name">${this.escapeHtml(currentStudent.name)}</div>
                                ${currentStudent.yearGroup ? `<div class="student-display-year">${this.escapeHtml(currentStudent.yearGroup)}</div>` : ''}
                            </div>
                        </div>
                        <div class="student-info-stats">
                            <div class="student-stat">
                                <span class="stat-value">${stats.totalSessions}</span>
                                <span class="stat-label">Sessions</span>
                            </div>
                            <div class="student-stat">
                                <span class="stat-value">${stats.overallAccuracy}%</span>
                                <span class="stat-label">Accuracy</span>
                            </div>
                            <div class="student-stat">
                                <span class="stat-value">${stats.completedModules}/4</span>
                                <span class="stat-label">Complete</span>
                            </div>
                        </div>
                        <div class="student-info-actions">
                            <button class="student-action-link" id="changeStudentBtn">Change Student</button>
                            <button class="student-action-link" id="viewProgressBtn">View Progress</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="student-info-section">
                    <div class="student-prompt-card">
                        <div class="student-prompt-icon">👥</div>
                        <div class="student-prompt-content">
                            <h3>Track Your Progress</h3>
                            <p>Select a student profile to track practice sessions and performance over time.</p>
                        </div>
                        <button class="student-prompt-btn" id="selectStudentBtn">Select Student</button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Render topic cards
     */
    renderTopics() {
        return Object.values(MODULES).map(module => {
            const isCompleted = moduleProgress.getProgress(module.id).completed;
            const completedClass = isCompleted ? 'completed' : '';
            const selectedClass = module.id === this.selectedModule ? 'selected' : '';

            return `
                <div class="topic-card ${selectedClass} ${completedClass}" data-module="${module.id}">
                    ${isCompleted ? '<div class="completion-badge">🏆</div>' : ''}
                    <div class="topic-icon">${module.icon}</div>
                    <div class="topic-name">${module.name}</div>
                    <div class="topic-desc">${module.description}</div>
                    <div class="topic-meta">${module.yearGroup}</div>
                </div>
            `;
        }).join('');
    }

    /**
     * Render cooldown period options
     */
    renderCooldownOptions() {
        const currentCooldown = questionHistory.getCooldownHours();
        const options = [
            { hours: 1, label: '1 hour' },
            { hours: 4, label: '4 hours' },
            { hours: 12, label: '12 hours' },
            { hours: 24, label: '24 hours (default)' },
            { hours: 48, label: '48 hours' },
            { hours: 168, label: '1 week' }
        ];

        return options.map(opt => `
            <option value="${opt.hours}" ${opt.hours === currentCooldown ? 'selected' : ''}>
                ${opt.label}
            </option>
        `).join('');
    }

    /**
     * Render adaptive learning controls (Phase 5)
     */
    renderAdaptiveControls() {
        const currentStudent = storageManager.getCurrentStudent();

        // Only show if student is selected
        if (!currentStudent) {
            return '';
        }

        const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);
        const isEnabled = adaptiveProfile ? adaptiveProfile.enabled : true;

        return `
            <div class="adaptive-controls" style="margin-top: 1.5rem;">
                <div class="adaptive-controls-header">
                    <label class="adaptive-controls-title">🎯 Adaptive Learning</label>
                    <label class="adaptive-toggle">
                        <input type="checkbox" id="adaptiveToggle" ${isEnabled ? 'checked' : ''}>
                        <span class="adaptive-toggle-slider"></span>
                    </label>
                </div>
                <p class="adaptive-controls-description">
                    Automatically monitors performance and suggests difficulty adjustments during practice sessions to keep learning optimal.
                </p>
            </div>
        `;
    }

    /**
     * Render difficulty level cards
     */
    renderLevels() {
        const levels = [
            { num: 1, name: 'Beginning', desc: 'Just starting out', color: 'green' },
            { num: 2, name: 'Developing', desc: 'Building confidence', color: 'blue' },
            { num: 3, name: 'Meeting', desc: 'Meeting expectations', color: 'purple' },
            { num: 4, name: 'Exceeding', desc: 'Going beyond', color: 'orange' }
        ];

        return levels.map(level => `
            <div class="level-card level-${level.color} ${level.num === this.selectedLevel ? 'selected' : ''}"
                 data-level="${level.num}">
                <div class="level-number">Level ${level.num}</div>
                <div class="level-name">${level.name}</div>
                <div class="level-desc">${level.desc}</div>
            </div>
        `).join('');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Phase 4: Student selector buttons
        const selectStudentBtn = this.container.querySelector('#selectStudentBtn');
        if (selectStudentBtn) {
            selectStudentBtn.addEventListener('click', () => {
                this.showStudentSelector();
            });
        }

        const changeStudentBtn = this.container.querySelector('#changeStudentBtn');
        if (changeStudentBtn) {
            changeStudentBtn.addEventListener('click', () => {
                this.showStudentSelector();
            });
        }

        const viewProgressBtn = this.container.querySelector('#viewProgressBtn');
        if (viewProgressBtn) {
            viewProgressBtn.addEventListener('click', () => {
                this.showProgressDashboard();
            });
        }

        // Topic selection
        const topicCards = this.container.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const moduleId = card.dataset.module;
                this.selectTopic(moduleId);
            });
        });

        // Level selection
        const levelCards = this.container.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const level = parseInt(card.dataset.level);
                this.selectLevel(level);
            });
        });

        // Question count controls
        const decreaseBtn = this.container.querySelector('#decreaseBtn');
        const increaseBtn = this.container.querySelector('#increaseBtn');
        const countInput = this.container.querySelector('#questionCount');

        decreaseBtn.addEventListener('click', () => {
            if (this.questionCount > 1) {
                this.questionCount--;
                countInput.value = this.questionCount;
            }
        });

        increaseBtn.addEventListener('click', () => {
            if (this.questionCount < 20) {
                this.questionCount++;
                countInput.value = this.questionCount;
            }
        });

        countInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value);
            if (value < 1) value = 1;
            if (value > 20) value = 20;
            this.questionCount = value;
            countInput.value = value;
        });

        // Start button
        const startBtn = this.container.querySelector('#startBtn');
        startBtn.addEventListener('click', () => {
            this.startPractice();
        });

        // Cooldown period selector
        const cooldownSelect = this.container.querySelector('#cooldownPeriod');
        cooldownSelect.addEventListener('change', (e) => {
            const hours = parseInt(e.target.value);
            questionHistory.setCooldown(hours);
            questionHistory.save();
            console.log(`Cooldown period set to ${hours} hours`);
        });

        // Clear history button
        const clearHistoryBtn = this.container.querySelector('#clearHistoryBtn');
        clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });

        // View stats button
        const viewStatsBtn = this.container.querySelector('#viewStatsBtn');
        viewStatsBtn.addEventListener('click', () => {
            this.viewStats();
        });

        // Phase 5: Adaptive learning toggle
        const adaptiveToggle = this.container.querySelector('#adaptiveToggle');
        if (adaptiveToggle) {
            adaptiveToggle.addEventListener('change', (e) => {
                const currentStudent = storageManager.getCurrentStudent();
                if (currentStudent) {
                    storageManager.setAdaptiveEnabled(currentStudent.id, e.target.checked);
                }
            });
        }
    }

    /**
     * Clear question history
     */
    clearHistory() {
        const confirmed = confirm(
            'This will clear all question history.\n\n' +
            'You may see previously seen questions again.\n\n' +
            'Continue?'
        );

        if (confirmed) {
            questionHistory.clear();
            alert('Question history cleared! ✓');
        }
    }

    /**
     * View history statistics
     */
    viewStats() {
        const stats = questionHistory.getStats();
        const cooldownHours = stats.cooldownHours;

        let message = `📊 Question History Statistics\n\n`;
        message += `Questions tracked: ${stats.totalTracked}\n`;
        message += `Cooldown period: ${cooldownHours} ${cooldownHours === 1 ? 'hour' : 'hours'}\n`;

        if (stats.totalTracked > 0) {
            const oldestDate = new Date(stats.oldestEntry);
            const newestDate = new Date(stats.newestEntry);
            message += `\nOldest entry: ${oldestDate.toLocaleString()}\n`;
            message += `Newest entry: ${newestDate.toLocaleString()}`;
        } else {
            message += `\nNo questions in history yet.`;
        }

        alert(message);
    }

    /**
     * Select a topic
     * @param {string} moduleId - Module identifier
     */
    selectTopic(moduleId) {
        this.selectedModule = moduleId;

        // Update UI
        const topicCards = this.container.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.classList.toggle('selected', card.dataset.module === moduleId);
        });

        // Enable start button if topic is selected
        this.updateStartButton();
    }

    /**
     * Select a difficulty level
     * @param {number} level - Level number (1-4)
     */
    selectLevel(level) {
        this.selectedLevel = level;

        // Update UI
        const levelCards = this.container.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            card.classList.toggle('selected', parseInt(card.dataset.level) === level);
        });
    }

    /**
     * Update start button state
     */
    updateStartButton() {
        const startBtn = this.container.querySelector('#startBtn');
        startBtn.disabled = !this.selectedModule;
    }

    /**
     * Start practice session
     */
    startPractice() {
        if (!this.selectedModule) {
            alert('Please select a topic!');
            return;
        }

        // Save current selection for later
        this.lastSession = {
            moduleId: this.selectedModule,
            level: this.selectedLevel,
            questionCount: this.questionCount
        };

        // Dispatch custom event with configuration
        const event = new CustomEvent('startPractice', {
            detail: this.lastSession
        });
        document.dispatchEvent(event);
    }

    /**
     * Show the screen
     */
    show() {
        this.container.classList.remove('hidden');
    }

    /**
     * Hide the screen
     */
    hide() {
        this.container.classList.add('hidden');
    }

    /**
     * Reset selections (restore last session if available)
     */
    reset() {
        // Restore last session if available, otherwise use defaults
        if (this.lastSession) {
            this.selectedModule = this.lastSession.moduleId;
            this.selectedLevel = this.lastSession.level;
            this.questionCount = this.lastSession.questionCount;
        } else {
            this.selectedModule = null;
            this.selectedLevel = 3;
            this.questionCount = 5;
        }

        this.render();
        this.attachEventListeners();

        // If we restored a previous selection, update the start button
        if (this.selectedModule) {
            this.updateStartButton();
        }
    }

    /**
     * Refresh topic cards (Phase 3.5 - for module completion badges)
     */
    refreshTopics() {
        const topicGrid = this.container.querySelector('#topicGrid');
        if (topicGrid) {
            topicGrid.innerHTML = this.renderTopics();

            // Re-attach click listeners for topic cards
            const topicCards = this.container.querySelectorAll('.topic-card');
            topicCards.forEach(card => {
                card.addEventListener('click', () => {
                    const moduleId = card.dataset.module;
                    this.selectTopic(moduleId);
                });
            });
        }
    }

    /**
     * Show student selector dialog (Phase 4)
     */
    showStudentSelector() {
        studentSelector.show((studentId) => {
            // Refresh student section when student is selected
            this.render();
            this.attachEventListeners();

            // Restore previous selections
            if (this.selectedModule) {
                const topicCards = this.container.querySelectorAll('.topic-card');
                topicCards.forEach(card => {
                    card.classList.toggle('selected', card.dataset.module === this.selectedModule);
                });
                this.updateStartButton();
            }

            const levelCards = this.container.querySelectorAll('.level-card');
            levelCards.forEach(card => {
                card.classList.toggle('selected', parseInt(card.dataset.level) === this.selectedLevel);
            });

            // Optionally show recommended level for selected module
            if (this.selectedModule) {
                const currentStudent = storageManager.getCurrentStudent();
                if (currentStudent) {
                    const recommendedLevel = storageManager.getRecommendedLevel(
                        currentStudent.id,
                        this.selectedModule
                    );

                    if (recommendedLevel !== this.selectedLevel) {
                        this.showLevelRecommendation(recommendedLevel);
                    }
                }
            }
        });
    }

    /**
     * Show progress dashboard (Phase 4)
     */
    showProgressDashboard() {
        progressDisplay.show();
    }

    /**
     * Show level recommendation notification (Phase 4)
     */
    showLevelRecommendation(recommendedLevel) {
        const levelNames = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };

        const message = `💡 Based on your recent performance, we recommend Level ${recommendedLevel} (${levelNames[recommendedLevel]}) for this module.`;

        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'level-recommendation-notification';
        notification.innerHTML = `
            <div class="recommendation-content">
                <span class="recommendation-icon">💡</span>
                <span class="recommendation-text">${message}</span>
                <button class="recommendation-apply-btn" data-level="${recommendedLevel}">
                    Apply Recommendation
                </button>
                <button class="recommendation-dismiss-btn">×</button>
            </div>
        `;

        this.container.insertBefore(notification, this.container.firstChild);

        // Auto-dismiss after 10 seconds
        const autoDismiss = setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);

        // Apply button
        const applyBtn = notification.querySelector('.recommendation-apply-btn');
        applyBtn.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            this.selectLevel(recommendedLevel);
            notification.remove();
        });

        // Dismiss button
        const dismissBtn = notification.querySelector('.recommendation-dismiss-btn');
        dismissBtn.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            notification.remove();
        });
    }
}

export default SetupScreen;

```

---
### `src\ui\studentSelector.js`
**Type:** js

```js
/**
 * Student Selector Component
 *
 * UI component for student profile management and selection.
 * Part of Phase 4: Progress Persistence
 *
 * Features:
 * - View all student profiles
 * - Select active student
 * - Create new student
 * - Edit student details
 * - Delete student profiles
 * - View quick stats for each student
 */

import storageManager from '../core/storageManager.js';

class StudentSelector {
    constructor() {
        this.element = null;
        this.onStudentSelected = null; // Callback when student is selected
    }

    /**
     * Show student selector dialog
     * @param {Function} onStudentSelected - Callback(studentId) when student is selected
     */
    show(onStudentSelected = null) {
        this.onStudentSelected = onStudentSelected;

        // Create overlay if it doesn't exist
        if (!this.element) {
            this.createElement();
        }

        this.render();
        document.body.appendChild(this.element);

        // Animate in
        setTimeout(() => this.element.classList.add('visible'), 10);
    }

    /**
     * Hide student selector
     */
    hide() {
        if (!this.element) return;

        this.element.classList.remove('visible');
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, 300);
    }

    /**
     * Create the overlay element
     */
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'student-selector-overlay';
    }

    /**
     * Render the student selector content
     */
    render() {
        const students = storageManager.getAllStudents();
        const currentStudent = storageManager.getCurrentStudent();

        this.element.innerHTML = `
            <div class="student-selector-card">
                <div class="student-selector-header">
                    <h2>👤 Select Student</h2>
                    <button class="close-btn" id="closeStudentSelector" aria-label="Close">×</button>
                </div>

                <div class="student-selector-body">
                    ${students.length > 0 ? this.renderStudentList(students, currentStudent) : this.renderEmptyState()}
                </div>

                <div class="student-selector-footer">
                    <button class="student-selector-btn primary" id="createStudentBtn">
                        + Create New Student
                    </button>
                    ${currentStudent ? `
                        <button class="student-selector-btn secondary" id="continueAnonymousBtn">
                            Continue Without Tracking
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    /**
     * Render list of students
     */
    renderStudentList(students, currentStudent) {
        return `
            <div class="student-list">
                ${students.map(student => {
                    const stats = storageManager.getStudentStats(student.id);
                    const isSelected = currentStudent && currentStudent.id === student.id;
                    const selectedClass = isSelected ? 'selected' : '';

                    return `
                        <div class="student-card ${selectedClass}" data-student-id="${student.id}">
                            <div class="student-card-main">
                                <div class="student-info">
                                    <div class="student-name">${this.escapeHtml(student.name)}</div>
                                    ${student.yearGroup ? `<div class="student-year">${this.escapeHtml(student.yearGroup)}</div>` : ''}
                                </div>
                                <div class="student-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">${stats.totalSessions}</div>
                                        <div class="stat-label">Sessions</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${stats.overallAccuracy}%</div>
                                        <div class="stat-label">Accuracy</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${stats.completedModules}</div>
                                        <div class="stat-label">Completed</div>
                                    </div>
                                </div>
                            </div>
                            <div class="student-card-actions">
                                <button class="student-action-btn select-btn" data-action="select" data-student-id="${student.id}">
                                    ${isSelected ? '✓ Selected' : 'Select'}
                                </button>
                                <button class="student-action-btn edit-btn" data-action="edit" data-student-id="${student.id}" title="Edit student">
                                    ✏️
                                </button>
                                <button class="student-action-btn delete-btn" data-action="delete" data-student-id="${student.id}" title="Delete student">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Render empty state when no students exist
     */
    renderEmptyState() {
        return `
            <div class="student-empty-state">
                <div class="empty-icon">👥</div>
                <h3>No Students Yet</h3>
                <p>Create a student profile to start tracking progress and performance.</p>
                <p class="empty-note">You can still practice without tracking by closing this dialog.</p>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('#closeStudentSelector');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        // Create student button
        const createBtn = this.element.querySelector('#createStudentBtn');
        if (createBtn) {
            createBtn.addEventListener('click', () => this.showCreateForm());
        }

        // Continue anonymous button
        const anonymousBtn = this.element.querySelector('#continueAnonymousBtn');
        if (anonymousBtn) {
            anonymousBtn.addEventListener('click', () => this.continueAnonymous());
        }

        // Student action buttons
        const actionButtons = this.element.querySelectorAll('.student-action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const studentId = btn.dataset.studentId;

                switch (action) {
                    case 'select':
                        this.selectStudent(studentId);
                        break;
                    case 'edit':
                        this.showEditForm(studentId);
                        break;
                    case 'delete':
                        this.confirmDelete(studentId);
                        break;
                }
            });
        });

        // Student card click (select)
        const studentCards = this.element.querySelectorAll('.student-card');
        studentCards.forEach(card => {
            card.addEventListener('click', () => {
                const studentId = card.dataset.studentId;
                this.selectStudent(studentId);
            });
        });
    }

    /**
     * Select a student
     */
    selectStudent(studentId) {
        const success = storageManager.setCurrentStudent(studentId);
        if (success) {
            const student = storageManager.getStudent(studentId);
            console.log(`✓ Selected student: ${student.name}`);

            // Call callback if provided
            if (this.onStudentSelected) {
                this.onStudentSelected(studentId);
            }

            // Show success feedback
            this.showSuccessFeedback(`Selected: ${student.name}`);

            // Close after brief delay
            setTimeout(() => this.hide(), 800);
        }
    }

    /**
     * Continue without student selection
     */
    continueAnonymous() {
        console.log('ℹ Continuing without student tracking');
        this.hide();
    }

    /**
     * Show create student form
     */
    showCreateForm() {
        const formHtml = `
            <div class="student-form-overlay">
                <div class="student-form-card">
                    <h3>Create New Student</h3>
                    <form id="createStudentForm">
                        <div class="form-group">
                            <label for="studentName">Name *</label>
                            <input type="text"
                                   id="studentName"
                                   class="form-input"
                                   placeholder="Enter student name"
                                   required
                                   autocomplete="off"
                                   maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="studentYear">Year Group (optional)</label>
                            <input type="text"
                                   id="studentYear"
                                   class="form-input"
                                   placeholder="e.g., Year 3"
                                   autocomplete="off"
                                   maxlength="20">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="form-btn primary">Create Student</button>
                            <button type="button" class="form-btn secondary" id="cancelCreateBtn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const formElement = document.createElement('div');
        formElement.innerHTML = formHtml;
        this.element.appendChild(formElement.firstElementChild);

        // Focus name input
        setTimeout(() => {
            const nameInput = this.element.querySelector('#studentName');
            if (nameInput) nameInput.focus();
        }, 100);

        // Form submit
        const form = this.element.querySelector('#createStudentForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.element.querySelector('#studentName').value.trim();
            const year = this.element.querySelector('#studentYear').value.trim();

            if (name) {
                const studentId = storageManager.createStudent(name, year);
                this.closeForm();
                this.render(); // Refresh list

                // Auto-select the new student
                this.selectStudent(studentId);
            }
        });

        // Cancel button
        const cancelBtn = this.element.querySelector('#cancelCreateBtn');
        cancelBtn.addEventListener('click', () => this.closeForm());
    }

    /**
     * Show edit student form
     */
    showEditForm(studentId) {
        const student = storageManager.getStudent(studentId);
        if (!student) return;

        const formHtml = `
            <div class="student-form-overlay">
                <div class="student-form-card">
                    <h3>Edit Student</h3>
                    <form id="editStudentForm">
                        <div class="form-group">
                            <label for="editStudentName">Name *</label>
                            <input type="text"
                                   id="editStudentName"
                                   class="form-input"
                                   value="${this.escapeHtml(student.name)}"
                                   required
                                   autocomplete="off"
                                   maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="editStudentYear">Year Group (optional)</label>
                            <input type="text"
                                   id="editStudentYear"
                                   class="form-input"
                                   value="${this.escapeHtml(student.yearGroup)}"
                                   autocomplete="off"
                                   maxlength="20">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="form-btn primary">Save Changes</button>
                            <button type="button" class="form-btn secondary" id="cancelEditBtn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const formElement = document.createElement('div');
        formElement.innerHTML = formHtml;
        this.element.appendChild(formElement.firstElementChild);

        // Form submit
        const form = this.element.querySelector('#editStudentForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.element.querySelector('#editStudentName').value.trim();
            const year = this.element.querySelector('#editStudentYear').value.trim();

            if (name) {
                storageManager.updateStudent(studentId, { name, yearGroup: year });
                this.closeForm();
                this.render(); // Refresh list
                this.showSuccessFeedback('Student updated!');
            }
        });

        // Cancel button
        const cancelBtn = this.element.querySelector('#cancelEditBtn');
        cancelBtn.addEventListener('click', () => this.closeForm());
    }

    /**
     * Confirm student deletion
     */
    confirmDelete(studentId) {
        const student = storageManager.getStudent(studentId);
        if (!student) return;

        const confirmed = confirm(
            `Delete student "${student.name}"?\n\n` +
            `This will permanently delete:\n` +
            `- Student profile\n` +
            `- All practice sessions\n` +
            `- All progress data\n\n` +
            `This action cannot be undone.`
        );

        if (confirmed) {
            const success = storageManager.deleteStudent(studentId);
            if (success) {
                this.render(); // Refresh list
                this.showSuccessFeedback('Student deleted');
            }
        }
    }

    /**
     * Close any open form
     */
    closeForm() {
        const formOverlay = this.element.querySelector('.student-form-overlay');
        if (formOverlay) {
            formOverlay.remove();
        }
    }

    /**
     * Show success feedback message
     */
    showSuccessFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'student-selector-feedback';
        feedback.textContent = message;

        this.element.appendChild(feedback);

        setTimeout(() => feedback.classList.add('visible'), 10);
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
const studentSelector = new StudentSelector();
export default studentSelector;

```

---
### `styles\adaptive.css`
**Type:** css

```css
/**
 * Phase 5: Adaptive Difficulty Engine - Styles
 *
 * Styles for adaptive learning components:
 * - Confidence Meter (real-time performance indicator)
 * - Adaptive Suggestion Modal (intervention dialog)
 * - Level change visualizations
 * - Animations and transitions
 */

/* ===== CONFIDENCE METER ===== */

.confidence-meter {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 500px;
    background: white;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 900;
}

.confidence-meter.visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
}

.confidence-meter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.confidence-meter-label {
    font-size: 14px;
    font-weight: 600;
    color: #555;
}

.confidence-meter-value {
    font-size: 18px;
    font-weight: 700;
    color: #333;
}

/* Progress Bar Container */
.confidence-meter-bar {
    position: relative;
    height: 24px;
    background: #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 8px;
}

/* Background Zones (visual reference) */
.confidence-meter-zones {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    opacity: 0.3;
}

.confidence-meter-zones .zone {
    height: 100%;
}

.zone-critical {
    background: linear-gradient(to right, #ff4444, #ff6666);
}

.zone-struggling {
    background: linear-gradient(to right, #ff6666, #ff9933);
}

.zone-challenging {
    background: linear-gradient(to right, #ff9933, #ffcc33);
}

.zone-optimal {
    background: linear-gradient(to right, #ffcc33, #66cc66);
}

.zone-excelling {
    background: linear-gradient(to right, #66cc66, #3399ff);
}

/* Progress Fill */
.confidence-meter-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 12px;
    transition: width 0.5s ease, background-color 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.5);
}

/* Color based on zone */
.confidence-fill-red {
    background: linear-gradient(to right, #ff4444, #ff6666);
}

.confidence-fill-orange {
    background: linear-gradient(to right, #ff6666, #ff9933);
}

.confidence-fill-amber {
    background: linear-gradient(to right, #ff9933, #ffcc33);
}

.confidence-fill-green {
    background: linear-gradient(to right, #66cc66, #44aa44);
}

.confidence-fill-blue {
    background: linear-gradient(to right, #3399ff, #2277dd);
}

/* Message Display */
.confidence-meter-message {
    font-size: 13px;
    text-align: center;
    font-weight: 500;
    color: #666;
    min-height: 18px;
    transition: color 0.3s ease;
}

.confidence-message-red {
    color: #cc3333;
}

.confidence-message-orange {
    color: #dd7722;
}

.confidence-message-amber {
    color: #cc9922;
}

.confidence-message-green {
    color: #339933;
}

.confidence-message-blue {
    color: #2277dd;
}

/* Pulse Animations */
@keyframes pulse-warning {
    0%, 100% {
        box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
    }
    50% {
        box-shadow: 0 4px 20px rgba(255, 68, 68, 0.6);
    }
}

@keyframes pulse-success {
    0%, 100% {
        box-shadow: 0 4px 12px rgba(51, 153, 255, 0.3);
    }
    50% {
        box-shadow: 0 4px 20px rgba(51, 153, 255, 0.6);
    }
}

.confidence-meter.pulse-warning {
    animation: pulse-warning 2s ease-in-out infinite;
}

.confidence-meter.pulse-success {
    animation: pulse-success 2s ease-in-out infinite;
}

/* ===== ADAPTIVE SUGGESTION MODAL ===== */

.adaptive-suggestion-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.adaptive-suggestion-overlay.visible {
    opacity: 1;
}

.adaptive-suggestion-modal {
    background: white;
    border-radius: 20px;
    padding: 40px 32px 32px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    text-align: center;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.adaptive-suggestion-overlay.visible .adaptive-suggestion-modal {
    transform: scale(1);
}

/* Icon */
.adaptive-suggestion-icon {
    font-size: 64px;
    margin-bottom: 16px;
    line-height: 1;
}

.adaptive-suggestion-icon.support {
    animation: gentle-bounce 0.6s ease;
}

.adaptive-suggestion-icon.challenge {
    animation: sparkle 0.6s ease;
}

.adaptive-suggestion-icon.alternative {
    animation: rotate-in 0.6s ease;
}

@keyframes gentle-bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes sparkle {
    0%, 100% {
        transform: scale(1) rotate(0deg);
    }
    25% {
        transform: scale(1.1) rotate(-5deg);
    }
    75% {
        transform: scale(1.1) rotate(5deg);
    }
}

@keyframes rotate-in {
    0% {
        transform: rotate(-180deg) scale(0);
    }
    100% {
        transform: rotate(0deg) scale(1);
    }
}

/* Title */
.adaptive-suggestion-title {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin: 0 0 16px 0;
}

/* Message */
.adaptive-suggestion-message {
    font-size: 18px;
    line-height: 1.5;
    color: #555;
    margin: 0 0 24px 0;
}

/* Level Change Visualization */
.level-change-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 24px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
}

.level-current,
.level-suggested {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.level-badge {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #e0e0e0;
    color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    transition: all 0.3s ease;
}

.level-badge.highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    transform: scale(1.1);
}

.level-label {
    font-size: 14px;
    font-weight: 600;
    color: #666;
}

.level-arrow {
    font-size: 32px;
    color: #999;
    font-weight: 300;
}

/* Action Buttons */
.adaptive-suggestion-actions {
    display: flex;
    gap: 12px;
    margin: 24px 0 16px;
}

.adaptive-suggestion-btn {
    flex: 1;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}

.adaptive-suggestion-btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.adaptive-suggestion-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.adaptive-suggestion-btn.primary:active {
    transform: translateY(0);
}

.adaptive-suggestion-btn.secondary {
    background: white;
    color: #666;
    border: 2px solid #ddd;
}

.adaptive-suggestion-btn.secondary:hover {
    background: #f8f9fa;
    border-color: #ccc;
}

.adaptive-suggestion-btn.secondary:active {
    background: #e9ecef;
}

/* Footer Message */
.adaptive-suggestion-footer {
    font-size: 14px;
    color: #999;
    margin-top: 16px;
}

/* ===== ADAPTIVE CONTROLS (Setup Screen) ===== */

.adaptive-controls {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
}

.adaptive-controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.adaptive-controls-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

.adaptive-toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
}

.adaptive-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.adaptive-toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 28px;
}

.adaptive-toggle-slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}

.adaptive-toggle input:checked + .adaptive-toggle-slider {
    background-color: #667eea;
}

.adaptive-toggle input:checked + .adaptive-toggle-slider:before {
    transform: translateX(22px);
}

.adaptive-controls-description {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}

/* ===== RESPONSIVE DESIGN ===== */

/* Tablet (iPad) */
@media (max-width: 1024px) {
    .confidence-meter {
        max-width: 600px;
        width: 85%;
    }

    .adaptive-suggestion-modal {
        max-width: 600px;
        width: 85%;
    }

    .adaptive-suggestion-title {
        font-size: 26px;
    }

    .adaptive-suggestion-message {
        font-size: 17px;
    }
}

/* Mobile */
@media (max-width: 480px) {
    .confidence-meter {
        top: 10px;
        width: 95%;
        padding: 12px 16px;
    }

    .confidence-meter-label {
        font-size: 13px;
    }

    .confidence-meter-value {
        font-size: 16px;
    }

    .confidence-meter-bar {
        height: 20px;
    }

    .confidence-meter-message {
        font-size: 12px;
    }

    .adaptive-suggestion-modal {
        width: 95%;
        padding: 32px 24px 24px;
    }

    .adaptive-suggestion-icon {
        font-size: 48px;
    }

    .adaptive-suggestion-title {
        font-size: 22px;
    }

    .adaptive-suggestion-message {
        font-size: 16px;
    }

    .level-change-visual {
        gap: 12px;
        padding: 16px;
    }

    .level-badge {
        width: 50px;
        height: 50px;
        font-size: 18px;
    }

    .level-arrow {
        font-size: 24px;
    }

    .adaptive-suggestion-actions {
        flex-direction: column;
    }

    .adaptive-suggestion-btn {
        padding: 14px 20px;
        font-size: 15px;
    }
}

/* ===== ACCESSIBILITY ===== */

/* Focus states */
.adaptive-suggestion-btn:focus {
    outline: 3px solid #667eea;
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .confidence-meter,
    .confidence-meter-fill,
    .adaptive-suggestion-overlay,
    .adaptive-suggestion-modal,
    .adaptive-suggestion-icon {
        animation: none !important;
        transition: none !important;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .confidence-meter {
        border: 2px solid currentColor;
    }

    .adaptive-suggestion-modal {
        border: 2px solid currentColor;
    }

    .adaptive-suggestion-btn.primary {
        border: 2px solid white;
    }

    .adaptive-suggestion-btn.secondary {
        border: 2px solid currentColor;
    }
}

```

---
### `styles\completion.css`
**Type:** css

```css
/**
 * Module Completion Styles
 *
 * Styling for module completion prompts and badges.
 * Part of Phase 3.5: Module Completion System
 */

/* ===== COMPLETION OVERLAY ===== */
.completion-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.completion-overlay.fade-out {
    animation: fadeOut 0.3s ease;
}

.completion-card {
    background: white;
    padding: 50px 40px;
    border-radius: 30px;
    text-align: center;
    max-width: 500px;
    animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.completion-celebration {
    font-size: 80px;
    margin-bottom: 20px;
    animation: bounce 1s ease-in-out;
}

.completion-card h2 {
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 20px;
}

.completion-module-icon {
    font-size: 80px;
    margin: 20px 0;
}

.completion-module-name {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 20px;
}

.completion-message {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 12px;
}

.completion-note {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin-bottom: 30px;
}

/* Completion buttons */
.completion-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

.completion-btn {
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

.completion-btn.primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.completion-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.completion-btn.primary:active {
    transform: translateY(0);
}

.completion-btn.secondary {
    background: white;
    color: var(--color-text);
    border: 2px solid var(--color-border);
}

.completion-btn.secondary:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
}

/* Success message after marking complete */
.completion-success {
    padding: 20px;
}

.completion-success-icon {
    font-size: 100px;
    margin-bottom: 20px;
    animation: rotate 0.8s ease-in-out;
}

.completion-success h2 {
    color: #10b981;
    margin-bottom: 12px;
}

.completion-success p {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
}

/* ===== COMPLETION BADGES ===== */
.completion-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 2rem;
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
    animation: badgePop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border: 3px solid white;
}

/* Completed module card styling */
.topic-card.completed {
    border: 2px solid #10b981;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    position: relative;
}

.topic-card.completed .topic-name {
    color: #059669;
    font-weight: 600;
}

/* ===== ANIMATIONS ===== */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-20px);
    }
    50% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(-10px);
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg) scale(0);
    }
    to {
        transform: rotate(360deg) scale(1);
    }
}

@keyframes badgePop {
    0% {
        transform: scale(0) rotate(0deg);
    }
    60% {
        transform: scale(1.2) rotate(10deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
    }
}

@keyframes badgeGlow {
    0%, 100% {
        box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
    }
    50% {
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.8);
    }
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */
@media (max-width: 768px) {
    .completion-card {
        padding: 40px 30px;
        max-width: 90%;
    }

    .completion-celebration {
        font-size: 60px;
    }

    .completion-module-icon {
        font-size: 60px;
    }

    .completion-card h2 {
        font-size: 2rem;
    }

    .completion-module-name {
        font-size: 1.5rem;
    }

    .completion-message {
        font-size: 1rem;
    }

    .completion-actions {
        flex-direction: column;
        gap: 10px;
    }

    .completion-btn {
        width: 100%;
    }

    .completion-badge {
        width: 45px;
        height: 45px;
        font-size: 1.75rem;
        top: 6px;
        right: 6px;
    }
}

/* Phone landscape */
@media (max-width: 480px) and (orientation: landscape) {
    .completion-card {
        padding: 30px 20px;
        max-height: 90vh;
        overflow-y: auto;
    }

    .completion-celebration {
        font-size: 50px;
        margin-bottom: 10px;
    }

    .completion-module-icon {
        font-size: 50px;
        margin: 10px 0;
    }
}

/* ===== ACCESSIBILITY ===== */
.completion-btn:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .completion-overlay,
    .completion-card,
    .completion-celebration,
    .completion-success-icon,
    .completion-badge {
        animation: none !important;
    }

    .completion-btn {
        transition: none !important;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .completion-btn.primary {
        border: 3px solid #059669;
    }

    .completion-btn.secondary {
        border-width: 3px;
    }

    .topic-card.completed {
        border-width: 3px;
    }
}

```

---
### `styles\keyboard.css`
**Type:** css

```css
/**
 * On-Screen Keyboard Styles
 *
 * Touch-optimized calculator-style keyboard
 * Only visible on touch devices
 */

/* ===== KEYBOARD CONTAINER ===== */
.on-screen-keyboard {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, #ffffff 0%, #f8fafc 100%);
    padding: 15px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: none; /* Hidden by default */
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
}

.on-screen-keyboard.active {
    transform: translateY(0);
}

/* Show keyboard only on touch devices */
@media (hover: none) and (pointer: coarse) {
    .on-screen-keyboard {
        display: block;
    }
}

/* Hide keyboard on desktop/mouse devices */
@media (hover: hover) and (pointer: fine) {
    .on-screen-keyboard {
        display: none !important;
    }
}

.keyboard-container {
    max-width: 500px;
    margin: 0 auto;
}

/* ===== KEYBOARD ROWS ===== */
.keyboard-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: center;
}

.keyboard-row.last-row {
    margin-bottom: 0;
}

/* ===== KEYBOARD KEYS ===== */
.key {
    flex: 1;
    min-width: 60px;
    max-width: 100px;
    min-height: 50px;
    padding: 15px;
    font-family: var(--font-body);
    font-size: 1.5rem;
    font-weight: 600;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.1s ease;
    box-shadow: var(--shadow-sm);

    /* Touch optimization */
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

/* Number keys */
.key.number-key {
    background: var(--color-surface);
    border-color: var(--color-primary-light);
}

.key.number-key:active,
.key.number-key.pressed {
    transform: scale(0.95);
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
}

/* Special keys (., -, ÷) */
.key.special-key {
    background: var(--color-bg);
    border-color: var(--color-border);
    color: var(--color-secondary);
}

.key.special-key:active,
.key.special-key.pressed {
    transform: scale(0.95);
    background: var(--color-secondary);
    color: white;
    border-color: var(--color-secondary);
}

/* Backspace key */
.key.backspace-key {
    background: #fee2e2;
    border-color: #fca5a5;
    color: #991b1b;
}

.key.backspace-key:active,
.key.backspace-key.pressed {
    transform: scale(0.95);
    background: var(--color-error);
    color: white;
    border-color: var(--color-error);
}

/* Submit key */
.key.submit-key {
    flex: 2;
    background: var(--color-success);
    color: white;
    border-color: var(--color-success);
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.key.submit-key:active,
.key.submit-key.pressed {
    transform: scale(0.98);
    background: #059669;
    border-color: #059669;
    box-shadow: var(--shadow-md);
}

.submit-icon {
    font-size: 1.5rem;
}

.submit-text {
    font-weight: 600;
}

/* Disabled state */
.key:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--color-bg);
    color: var(--color-text-secondary);
}

.key:disabled:active {
    transform: none;
}

/* ===== KEYBOARD DISPLAY (Custom input replacement) ===== */
.keyboard-display {
    width: 100%;
    height: 60px;  /* Fixed height instead of min-height */
    padding: 1rem;
    font-size: var(--font-size-xl);
    font-weight: 600;
    text-align: center;
    line-height: 1.2;  /* Consistent line height */

    /* Make it look like an input */
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);

    /* Behavior */
    cursor: text;
    user-select: none;
    -webkit-user-select: none;

    /* Layout */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;  /* Prevent content from overflowing */

    /* Visual feedback */
    transition: border-color var(--transition-base), box-shadow var(--transition-base);
    box-shadow: var(--shadow-sm);
}

.keyboard-display:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

/* Empty state - show placeholder */
.keyboard-display.empty::before,
.keyboard-display:empty::before {
    content: attr(data-placeholder);
    color: var(--color-text-secondary);
    font-weight: 400;
    font-size: var(--font-size-base);
}

/* ===== TOUCH DEVICE OPTIMIZATIONS ===== */
@media (hover: none) and (pointer: coarse) {
    /* Hide native text input on touch devices (use keyboard-display instead) */
    #practiceScreen .text-input {
        display: none;
    }

    /* Show keyboard display */
    .keyboard-display {
        display: flex;
    }

    /* Hide the original submit button when keyboard is active */
    #practiceScreen .submit-btn {
        display: none;
    }

    /* Add padding to question card to prevent keyboard overlap */
    .question-card {
        margin-bottom: 320px; /* Height of keyboard + padding */
    }

    /* Adjust answer area spacing */
    .answer-area {
        margin-bottom: var(--spacing-md);
    }

    /* Keyboard container */
    #keyboardContainer {
        margin-top: var(--spacing-md);
    }
}

/* Desktop: hide keyboard display, show native input */
@media (hover: hover) and (pointer: fine) {
    .keyboard-display {
        display: none !important;
    }
}

/* ===== ANIMATIONS ===== */
@keyframes slideUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideDown {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(100%);
        opacity: 0;
    }
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */

/* Smaller tablets and phones in landscape */
@media (max-width: 768px) and (orientation: landscape) {
    .on-screen-keyboard {
        padding: 10px;
    }

    .keyboard-row {
        gap: 8px;
        margin-bottom: 8px;
    }

    .key {
        min-height: 45px;
        padding: 12px;
        font-size: 1.25rem;
    }
}

/* Phones in portrait */
@media (max-width: 480px) {
    .on-screen-keyboard {
        padding: 12px;
    }

    .keyboard-row {
        gap: 8px;
        margin-bottom: 8px;
    }

    .key {
        min-width: 50px;
        min-height: 48px;
        padding: 12px;
        font-size: 1.25rem;
    }

    .submit-text {
        display: none; /* Show only icon on small screens */
    }
}

/* Large tablets (iPad Pro) */
@media (min-width: 1024px) and (hover: none) {
    .keyboard-row {
        gap: 15px;
        margin-bottom: 15px;
    }

    .key {
        min-width: 80px;
        min-height: 60px;
        padding: 20px;
        font-size: 1.75rem;
    }

    .key.submit-key {
        font-size: 1.25rem;
    }
}

/* ===== ACCESSIBILITY ===== */

/* Focus visible for keyboard navigation (accessibility) */
.key:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .key {
        border-width: 3px;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .on-screen-keyboard {
        transition: none;
    }

    .key {
        transition: none;
    }

    .key:active,
    .key.pressed {
        transform: none;
    }
}

```

---
### `styles\main.css`
**Type:** css

```css
/**
 * Main Styles - Sleek Modern Light Theme
 * Optimized for tablets and desktop
 */

/* ===== CSS RESET & VARIABLES ===== */
:root {
    /* Colors - Light theme */
    --color-primary: #2563eb;
    --color-primary-dark: #1d4ed8;
    --color-primary-light: #dbeafe;

    --color-secondary: #64748b;
    --color-accent: #8b5cf6;

    --color-success: #10b981;
    --color-success-light: #d1fae5;
    --color-error: #ef4444;
    --color-error-light: #fee2e2;
    --color-warning: #f59e0b;

    --color-bg: #f8fafc;
    --color-surface: #ffffff;
    --color-border: #e2e8f0;
    --color-text: #1e293b;
    --color-text-secondary: #64748b;

    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;

    /* Typography */
    --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;

    /* Border radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 200ms ease;
    --transition-slow: 300ms ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-body);
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
    padding: var(--spacing-md);
}

/* ===== LAYOUT ===== */
.app-container {
    max-width: 1200px;
    margin: 0 auto;
}

.screen {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-lg);
    min-height: 500px;
}

.hidden {
    display: none !important;
}

/* ===== TYPOGRAPHY ===== */
h1 {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
}

h2 {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
}

h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-text);
}

.subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
}

/* ===== BUTTONS ===== */
button {
    font-family: var(--font-body);
    cursor: pointer;
    border: none;
    font-weight: 500;
    transition: all var(--transition-base);
    outline: none;
}

button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.start-btn,
.action-btn.primary {
    width: 100%;
    padding: 1rem 2rem;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-lg);
    font-size: var(--font-size-lg);
    font-weight: 600;
    box-shadow: var(--shadow-md);
}

.start-btn:hover:not(:disabled),
.action-btn.primary:hover:not(:disabled) {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.action-btn.secondary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
}

.action-btn.secondary:hover {
    background: var(--color-primary-light);
}

/* ===== INPUT FIELDS ===== */
input[type="text"],
input[type="number"] {
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    padding: 0.75rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
    outline: none;
}

input[type="text"]:focus,
input[type="number"]:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

input[type="text"]:disabled,
input[type="number"]:disabled {
    background: var(--color-bg);
    cursor: not-allowed;
}

/* ===== UTILITY CLASSES ===== */
.text-center {
    text-align: center;
}

.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }
.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }

```

---
### `styles\powerup.css`
**Type:** css

```css
/**
 * Power-Up and Streak Styles
 *
 * Animations and styling for the auto power-up system (Phase 3)
 */

/* ===== POWER-UP BUTTON ===== */
.power-up-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1001;

    /* Appearance */
    padding: 20px 30px;
    background: linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%);
    color: white;
    border: none;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);
    cursor: pointer;

    /* Typography */
    font-family: var(--font-body);
    font-size: 1.125rem;
    font-weight: 700;

    /* Initial state */
    transform: translateY(150px) scale(0.8);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.power-up-btn.visible {
    transform: translateY(0) scale(1);
    opacity: 1;
    animation: pulse 2s ease-in-out infinite;
}

.power-up-btn:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
    animation: none;
}

.power-up-btn:active {
    transform: translateY(-2px) scale(1.02);
}

.power-up-btn.animate-out {
    transform: translateY(150px) scale(0.5);
    opacity: 0;
}

.power-up-btn.activating {
    animation: burst 0.5s ease-out;
}

/* Power-up button content */
.power-up-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.power-up-icon {
    font-size: 2rem;
    animation: glow 1.5s ease-in-out infinite;
}

.power-up-text {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.power-up-subtitle {
    font-size: 0.875rem;
    opacity: 0.95;
}

/* ===== STREAK DISPLAY ===== */
.streak-display {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 20px;
    transition: all 0.3s ease;
}

.streak-display.hot {
    background: linear-gradient(135deg, #ff6b6b, #ffd700);
    border-color: #ff6b6b;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.streak-icon {
    font-size: 1.25rem;
}

.streak-count {
    font-weight: 600;
    font-size: 1rem;
}

.streak-display.hot .streak-icon {
    animation: flame 0.5s ease-in-out infinite;
}

/* ===== POWER-UP CONFIRMATION DIALOG ===== */
.power-up-confirmation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2100;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.power-up-confirmation-overlay.visible {
    opacity: 1;
}

.power-up-confirmation-card {
    background: white;
    padding: 40px 35px;
    border-radius: 24px;
    text-align: center;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.power-up-confirmation-overlay.visible .power-up-confirmation-card {
    transform: scale(1);
}

.power-up-confirmation-icon {
    font-size: 80px;
    margin-bottom: 20px;
    animation: bounce 0.6s ease-in-out;
}

.power-up-confirmation-card h2 {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 16px;
}

.power-up-confirmation-message {
    font-size: 1.25rem;
    color: var(--color-text);
    line-height: 1.5;
    margin-bottom: 12px;
}

.power-up-confirmation-note {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.4;
    margin-bottom: 28px;
}

.power-up-confirmation-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.power-up-confirmation-btn {
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    min-width: 140px;
}

.power-up-confirmation-btn.primary {
    background: linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.power-up-confirmation-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
}

.power-up-confirmation-btn.primary:active {
    transform: translateY(0);
}

.power-up-confirmation-btn.secondary {
    background: white;
    color: var(--color-text);
    border: 2px solid var(--color-border);
}

.power-up-confirmation-btn.secondary:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
}

/* ===== LEVEL 4 COMPLETION DIALOG ===== */
.level4-completion-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2100;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.level4-completion-overlay.visible {
    opacity: 1;
}

.level4-completion-card {
    background: white;
    padding: 40px 35px;
    border-radius: 24px;
    text-align: center;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.level4-completion-overlay.visible .level4-completion-card {
    transform: scale(1);
}

.level4-completion-icon {
    font-size: 80px;
    margin-bottom: 20px;
    animation: rotate 0.8s ease-in-out;
}

.level4-completion-card h2 {
    font-size: 2rem;
    color: #10b981;
    margin-bottom: 16px;
}

.level4-completion-message {
    font-size: 1.25rem;
    color: var(--color-text);
    line-height: 1.5;
    margin-bottom: 16px;
}

.level4-completion-module {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 12px;
}

.level4-completion-note {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.4;
    margin-bottom: 28px;
}

.level4-completion-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.level4-completion-btn {
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    min-width: 140px;
}

.level4-completion-btn.primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.level4-completion-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.level4-completion-btn.primary:active {
    transform: translateY(0);
}

.level4-completion-btn.secondary {
    background: white;
    color: var(--color-text);
    border: 2px solid var(--color-border);
}

.level4-completion-btn.secondary:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
}

/* ===== POWER-UP CELEBRATION OVERLAY ===== */
.power-up-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.power-up-card {
    background: white;
    padding: 60px 40px;
    border-radius: 30px;
    text-align: center;
    max-width: 500px;
    animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.power-up-icon {
    font-size: 100px;
    margin-bottom: 20px;
    animation: rotate 1s ease-in-out;
}

.power-up-card h2 {
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 16px;
}

.power-up-card p {
    font-size: 1.5rem;
    color: var(--color-text);
    margin-bottom: 12px;
}

.power-up-subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

/* ===== ANIMATIONS ===== */
@keyframes pulse {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-5px) scale(1.05);
    }
}

@keyframes glow {
    0%, 100% {
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
    }
    50% {
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 1));
    }
}

@keyframes burst {
    0% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-10px) scale(1.2);
        box-shadow: 0 20px 50px rgba(255, 215, 0, 0.8);
    }
    100% {
        transform: translateY(0) scale(1);
    }
}

@keyframes flame {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    25% {
        transform: translateY(-2px) rotate(-5deg);
    }
    75% {
        transform: translateY(-2px) rotate(5deg);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg) scale(0);
    }
    to {
        transform: rotate(360deg) scale(1);
    }
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */
@media (max-width: 768px) {
    .power-up-btn {
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        font-size: 1rem;
    }

    .power-up-icon {
        font-size: 1.5rem;
    }

    .power-up-card {
        padding: 40px 30px;
        max-width: 90%;
    }

    .power-up-icon {
        font-size: 80px;
    }

    .power-up-card h2 {
        font-size: 2rem;
    }

    .power-up-card p {
        font-size: 1.25rem;
    }

    /* Confirmation dialog responsive */
    .power-up-confirmation-card {
        padding: 35px 25px;
    }

    .power-up-confirmation-icon {
        font-size: 60px;
    }

    .power-up-confirmation-card h2 {
        font-size: 1.75rem;
    }

    .power-up-confirmation-message {
        font-size: 1.125rem;
    }

    .power-up-confirmation-actions {
        flex-direction: column;
    }

    .power-up-confirmation-btn {
        width: 100%;
    }

    /* Level 4 completion dialog responsive */
    .level4-completion-card {
        padding: 35px 25px;
    }

    .level4-completion-icon {
        font-size: 60px;
    }

    .level4-completion-card h2 {
        font-size: 1.75rem;
    }

    .level4-completion-message {
        font-size: 1.125rem;
    }

    .level4-completion-module {
        font-size: 1.25rem;
    }

    .level4-completion-actions {
        flex-direction: column;
    }

    .level4-completion-btn {
        width: 100%;
    }
}

/* Phone landscape */
@media (max-width: 480px) and (orientation: landscape) {
    .power-up-btn {
        bottom: 10px;
        right: 10px;
        padding: 12px 20px;
    }

    .power-up-card {
        padding: 30px 20px;
    }
}

/* ===== ACCESSIBILITY ===== */
.power-up-btn:focus-visible {
    outline: 3px solid white;
    outline-offset: 4px;
}

.power-up-confirmation-btn:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
}

.level4-completion-btn:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .power-up-btn,
    .power-up-icon,
    .streak-display,
    .power-up-overlay,
    .power-up-card,
    .power-up-icon,
    .power-up-confirmation-overlay,
    .power-up-confirmation-card,
    .power-up-confirmation-icon,
    .level4-completion-overlay,
    .level4-completion-card,
    .level4-completion-icon {
        animation: none !important;
        transition: none !important;
    }

    .power-up-btn.visible {
        transform: translateY(0) scale(1);
    }

    .power-up-confirmation-overlay.visible .power-up-confirmation-card {
        transform: scale(1);
    }

    .level4-completion-overlay.visible .level4-completion-card {
        transform: scale(1);
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .power-up-btn {
        border: 3px solid white;
    }

    .streak-display.hot {
        border-width: 3px;
    }
}

```

---
### `styles\progress.css`
**Type:** css

```css
/**
 * Progress Tracking Styles
 *
 * Styling for student management, progress tracking, and statistics display.
 * Part of Phase 4: Progress Persistence
 */

/* ===== STUDENT INFO SECTION (Setup Screen) ===== */
.student-info-section {
    margin: 2rem 0;
}

.student-info-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border: 2px solid var(--color-border);
    border-radius: 20px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.student-info-main {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    min-width: 200px;
}

.student-avatar {
    font-size: 3rem;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.student-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.student-display-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
}

.student-display-year {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

.student-info-stats {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}

.student-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 80px;
}

.student-stat .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-primary);
}

.student-stat .stat-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.student-info-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.student-action-link {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.student-action-link:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
}

.student-action-link:active {
    transform: translateY(0);
}

/* Student Prompt Card (No student selected) */
.student-prompt-card {
    background: linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 100%);
    border: 2px dashed var(--color-primary);
    border-radius: 20px;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.student-prompt-icon {
    font-size: 3.5rem;
    opacity: 0.7;
}

.student-prompt-content {
    flex: 1;
    min-width: 200px;
}

.student-prompt-content h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: var(--color-text);
}

.student-prompt-content p {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
}

.student-prompt-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.student-prompt-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.student-prompt-btn:active {
    transform: translateY(0);
}

/* ===== STUDENT SELECTOR DIALOG ===== */
.student-selector-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2100;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.student-selector-overlay.visible {
    opacity: 1;
}

.student-selector-card {
    background: white;
    border-radius: 24px;
    width: 90%;
    max-width: 700px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.95);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.student-selector-overlay.visible .student-selector-card {
    transform: scale(1);
}

.student-selector-header {
    padding: 24px 28px;
    border-bottom: 2px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.student-selector-header h2 {
    font-size: 1.75rem;
    color: var(--color-text);
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-btn:hover {
    background: var(--color-bg);
    color: var(--color-text);
}

.student-selector-body {
    padding: 24px 28px;
    overflow-y: auto;
    flex: 1;
}

.student-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.student-card {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 16px;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.student-card:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);
}

.student-card.selected {
    border-color: var(--color-primary);
    background: linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 100%);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.student-card-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 12px;
}

.student-info {
    flex: 1;
}

.student-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 4px;
}

.student-year {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
}

.student-stats {
    display: flex;
    gap: 20px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
}

.stat-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.student-card-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

.student-action-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
}

.student-action-btn.select-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    flex: 1;
}

.student-action-btn.select-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.student-card.selected .student-action-btn.select-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.student-action-btn.edit-btn,
.student-action-btn.delete-btn {
    background: white;
    border: 2px solid var(--color-border);
    padding: 8px 12px;
}

.student-action-btn.edit-btn:hover {
    border-color: var(--color-primary);
    background: var(--color-bg);
}

.student-action-btn.delete-btn:hover {
    border-color: #ef4444;
    background: #fee;
}

/* Empty State */
.student-empty-state {
    text-align: center;
    padding: 40px 20px;
}

.empty-icon {
    font-size: 5rem;
    opacity: 0.5;
    margin-bottom: 20px;
}

.student-empty-state h3 {
    font-size: 1.5rem;
    color: var(--color-text);
    margin-bottom: 12px;
}

.student-empty-state p {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 8px;
}

.empty-note {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    font-style: italic;
}

.student-selector-footer {
    padding: 20px 28px;
    border-top: 2px solid var(--color-border);
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.student-selector-btn {
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    flex: 1;
    min-width: 200px;
}

.student-selector-btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.student-selector-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.student-selector-btn.primary:active {
    transform: translateY(0);
}

.student-selector-btn.secondary {
    background: white;
    color: var(--color-text);
    border: 2px solid var(--color-border);
}

.student-selector-btn.secondary:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
}

/* ===== STUDENT FORM ===== */
.student-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2200;
}

.student-form-card {
    background: white;
    border-radius: 20px;
    padding: 32px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.student-form-card h3 {
    font-size: 1.5rem;
    color: var(--color-text);
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 8px;
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--color-border);
    border-radius: 10px;
    font-size: 1rem;
    font-family: var(--font-body);
    transition: all 0.2s ease;
}

.form-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.form-btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    flex: 1;
    transition: all 0.2s ease;
}

.form-btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.form-btn.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.form-btn.primary:active {
    transform: translateY(0);
}

.form-btn.secondary {
    background: white;
    color: var(--color-text);
    border: 2px solid var(--color-border);
}

.form-btn.secondary:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
}

/* ===== LEVEL RECOMMENDATION ===== */
.level-recommendation-notification {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border: 2px solid #f59e0b;
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 20px;
    animation: slideDown 0.3s ease;
}

.recommendation-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.recommendation-icon {
    font-size: 1.5rem;
}

.recommendation-text {
    flex: 1;
    min-width: 200px;
    font-size: 1rem;
    color: #92400e;
    line-height: 1.5;
}

.recommendation-apply-btn {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.recommendation-apply-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
}

.recommendation-dismiss-btn {
    background: white;
    color: #92400e;
    border: 2px solid #f59e0b;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.recommendation-dismiss-btn:hover {
    background: #fef3c7;
}

/* ===== SUCCESS FEEDBACK ===== */
.student-selector-feedback {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
    font-weight: 600;
    z-index: 2300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.student-selector-feedback.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ===== PROGRESS DASHBOARD ===== */
.progress-dashboard-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2100;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.progress-dashboard-overlay.visible {
    opacity: 1;
}

.progress-dashboard-card {
    background: white;
    border-radius: 24px;
    width: 95%;
    max-width: 1100px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}

.progress-dashboard-header {
    padding: 24px 28px;
    border-bottom: 2px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
    border-radius: 24px 24px 0 0;
}

.dashboard-title-section h2 {
    font-size: 1.75rem;
    color: var(--color-text);
    margin: 0 0 4px 0;
}

.dashboard-student-name {
    font-size: 1rem;
    color: var(--color-text-secondary);
    font-weight: 600;
}

.progress-dashboard-body {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

/* Dashboard Sections */
.dashboard-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.dashboard-section-title {
    font-size: 1.25rem;
    color: var(--color-text);
    margin: 0;
    font-weight: 700;
}

/* Overall Stats Grid */
.dashboard-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
}

.dashboard-stat-card {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 16px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}

.dashboard-stat-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.dashboard-stat-icon {
    font-size: 2rem;
}

.dashboard-stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-primary);
}

.dashboard-stat-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    text-align: center;
}

/* Module Progress Grid */
.dashboard-modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.dashboard-module-card {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: all 0.2s ease;
}

.dashboard-module-card:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.dashboard-module-card.completed {
    border-color: #10b981;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.dashboard-module-header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.dashboard-module-icon {
    font-size: 2.5rem;
}

.dashboard-module-info {
    flex: 1;
}

.dashboard-module-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
}

.dashboard-module-badge {
    font-size: 0.875rem;
    color: #059669;
    font-weight: 600;
}

.dashboard-module-levels {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.dashboard-level-item {
    display: grid;
    grid-template-columns: 30px 1fr 50px 24px;
    align-items: center;
    gap: 8px;
}

.dashboard-level-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
}

.dashboard-level-bar {
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
}

.dashboard-level-fill {
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
}

.dashboard-level-item.complete .dashboard-level-fill {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.dashboard-level-item.recommended .dashboard-level-bar {
    box-shadow: 0 0 0 2px #fbbf24;
}

.dashboard-level-count {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-align: right;
}

.dashboard-level-rec {
    font-size: 1rem;
}

.dashboard-module-stats {
    display: flex;
    gap: 16px;
    padding-top: 8px;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
}

.module-stat {
    display: flex;
    gap: 4px;
}

.module-stat-label {
    color: var(--color-text-secondary);
}

.module-stat-value {
    font-weight: 600;
}

.trend-improving { color: #10b981; }
.trend-stable { color: #6b7280; }
.trend-declining { color: #ef4444; }
.trend-neutral { color: var(--color-text-secondary); }

/* Recent Sessions */
.dashboard-sessions-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.dashboard-session-item {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    transition: all 0.2s ease;
}

.dashboard-session-item:hover {
    border-color: var(--color-primary);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.dashboard-session-module {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 200px;
}

.session-module-icon {
    font-size: 2rem;
}

.session-module-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.session-module-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
}

.session-module-meta {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.dashboard-session-stats {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.session-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.session-stat-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.session-stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
}

.accuracy-high { color: #10b981; }
.accuracy-medium { color: #f59e0b; }
.accuracy-low { color: #ef4444; }

/* Data Management */
.dashboard-storage-info {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}

.storage-info-item {
    display: flex;
    gap: 8px;
}

.storage-info-label {
    color: var(--color-text-secondary);
}

.storage-info-value {
    font-weight: 600;
    color: var(--color-text);
}

.dashboard-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.dashboard-action-btn {
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    flex: 1;
    min-width: 150px;
}

.dashboard-action-btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.dashboard-action-btn.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.dashboard-action-btn.primary:active {
    transform: translateY(0);
}

.dashboard-action-btn.secondary {
    background: white;
    color: var(--color-text);
    border: 2px solid var(--color-border);
}

.dashboard-action-btn.secondary:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
}

/* Dashboard Feedback */
.dashboard-feedback {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
    font-weight: 600;
    z-index: 2300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.dashboard-feedback.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Empty State */
.dashboard-empty-state {
    text-align: center;
    padding: 40px 20px;
    background: var(--color-bg);
    border: 2px dashed var(--color-border);
    border-radius: 12px;
}

.dashboard-empty-state p {
    color: var(--color-text-secondary);
    font-size: 1rem;
}

/* ===== ANIMATIONS ===== */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */
@media (max-width: 768px) {
    .student-info-card {
        flex-direction: column;
        align-items: stretch;
        padding: 20px;
    }

    .student-info-main {
        width: 100%;
    }

    .student-info-stats {
        width: 100%;
        justify-content: space-around;
        gap: 16px;
    }

    .student-info-actions {
        width: 100%;
        flex-direction: column;
    }

    .student-action-link {
        width: 100%;
        text-align: center;
    }

    .student-prompt-card {
        flex-direction: column;
        text-align: center;
        padding: 24px;
    }

    .student-prompt-btn {
        width: 100%;
    }

    .student-selector-card {
        width: 95%;
        max-height: 90vh;
    }

    .student-selector-header {
        padding: 20px;
    }

    .student-selector-body {
        padding: 16px 20px;
    }

    .student-selector-footer {
        padding: 16px 20px;
        flex-direction: column;
    }

    .student-selector-btn {
        width: 100%;
        min-width: unset;
    }

    .student-card {
        padding: 16px;
    }

    .student-card-main {
        flex-direction: column;
        align-items: flex-start;
    }

    .student-stats {
        width: 100%;
        justify-content: space-around;
    }

    .student-card-actions {
        width: 100%;
        flex-direction: column;
    }

    .student-action-btn {
        width: 100%;
    }

    .student-form-card {
        width: 95%;
        padding: 24px;
    }

    .recommendation-content {
        flex-direction: column;
        align-items: stretch;
    }

    .recommendation-apply-btn,
    .recommendation-dismiss-btn {
        width: 100%;
    }
}

/* ===== ACCESSIBILITY ===== */
.student-action-link:focus-visible,
.student-prompt-btn:focus-visible,
.student-selector-btn:focus-visible,
.student-action-btn:focus-visible,
.form-btn:focus-visible,
.recommendation-apply-btn:focus-visible,
.recommendation-dismiss-btn:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
}

.form-input:focus-visible {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .student-info-card,
    .student-card,
    .student-selector-overlay,
    .student-selector-card,
    .student-form-overlay,
    .student-selector-feedback,
    .level-recommendation-notification {
        animation: none !important;
        transition: none !important;
    }

    .student-selector-overlay.visible .student-selector-card {
        transform: scale(1);
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .student-info-card,
    .student-prompt-card,
    .student-card {
        border-width: 3px;
    }

    .student-prompt-btn,
    .student-selector-btn.primary,
    .student-action-btn.select-btn,
    .form-btn.primary,
    .recommendation-apply-btn {
        border: 3px solid currentColor;
    }
}

```

---
### `styles\responsive.css`
**Type:** css

```css
/**
 * Responsive Styles
 * Optimized for tablets (iPad) and mobile devices
 */

/* ===== TABLET (LANDSCAPE) ===== */
@media (max-width: 1024px) {
    .screen {
        padding: var(--spacing-lg);
    }

    .topic-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .question-text {
        font-size: 1.375rem;
    }
}

/* ===== TABLET (PORTRAIT) & LARGE MOBILE ===== */
@media (max-width: 768px) {
    body {
        padding: var(--spacing-sm);
    }

    .screen {
        padding: var(--spacing-md);
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    /* Setup Screen */
    .topic-grid {
        grid-template-columns: 1fr;
    }

    .level-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Practice Screen */
    .practice-header {
        flex-direction: column;
        gap: var(--spacing-md);
        align-items: flex-start;
    }

    .progress-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        width: 100%;
    }

    .level-display {
        margin-left: 0;
        align-self: flex-start;
    }

    .score-display {
        width: 100%;
        justify-content: space-around;
    }

    .question-text {
        font-size: 1.25rem;
    }

    /* Results Screen */
    .results-stats {
        grid-template-columns: 1fr;
    }

    .results-actions {
        grid-template-columns: 1fr;
    }
}

/* ===== MOBILE ===== */
@media (max-width: 480px) {
    h1 {
        font-size: 1.75rem;
    }

    .setup-header {
        margin-bottom: var(--spacing-md);
    }

    .level-grid {
        grid-template-columns: 1fr;
    }

    .settings-group {
        flex-direction: column;
        align-items: stretch;
    }

    .input-group {
        justify-content: center;
    }

    .question-text {
        font-size: 1.125rem;
    }

    .answer-btn {
        padding: 0.875rem 1rem;
    }

    .results-icon {
        font-size: 3.5rem;
    }
}

/* ===== TOUCH DEVICE OPTIMIZATIONS ===== */
@media (hover: none) and (pointer: coarse) {
    /* Increase tap targets for touch devices */
    button {
        min-height: 44px;
        min-width: 44px;
    }

    .topic-card,
    .level-card,
    .answer-btn {
        min-height: 60px;
    }

    /* Remove hover effects on touch devices */
    .topic-card:hover,
    .level-card:hover,
    .answer-btn:hover {
        transform: none;
    }

    /* Enhance active states for touch feedback */
    .topic-card:active,
    .level-card:active {
        transform: scale(0.98);
        opacity: 0.9;
    }

    .answer-btn:active:not(:disabled) {
        transform: scale(0.98);
    }

    button:active {
        transform: scale(0.97);
    }
}

/* ===== PRINT STYLES ===== */
@media print {
    body {
        background: white;
        padding: 0;
    }

    .screen {
        box-shadow: none;
        border: 1px solid #000;
    }

    .practice-header,
    .progress-bar,
    button {
        display: none;
    }

    .question-card {
        page-break-inside: avoid;
    }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    :root {
        --color-border: #000;
        --shadow-sm: none;
        --shadow-md: none;
        --shadow-lg: none;
        --shadow-xl: none;
    }

    button,
    .topic-card,
    .level-card,
    .answer-btn {
        border-width: 2px;
    }
}

/* Dark mode support (future enhancement) */
@media (prefers-color-scheme: dark) {
    /* Uncomment when implementing dark mode
    :root {
        --color-bg: #1e293b;
        --color-surface: #334155;
        --color-border: #475569;
        --color-text: #f1f5f9;
        --color-text-secondary: #cbd5e1;
    }
    */
}

```

---
### `styles\screens.css`
**Type:** css

```css
/**
 * Screen-Specific Styles
 */

/* ===== SETUP SCREEN ===== */
.setup-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.setup-section {
    margin-bottom: var(--spacing-xl);
}

.section-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    color: var(--color-text);
}

/* Topic Grid */
.topic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.topic-card {
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    cursor: pointer;
    transition: all var(--transition-base);
    text-align: center;
}

.topic-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.topic-card.selected {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    box-shadow: var(--shadow-md);
}

.topic-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-sm);
}

.topic-name {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
}

.topic-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
}

.topic-meta {
    font-size: var(--font-size-sm);
    color: var(--color-secondary);
    font-weight: 500;
}

/* Level Grid */
.level-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-md);
}

.level-card {
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    cursor: pointer;
    transition: all var(--transition-base);
    text-align: center;
}

.level-card:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
}

.level-card.selected {
    border-width: 3px;
    box-shadow: var(--shadow-md);
}

.level-card.level-green.selected {
    border-color: #10b981;
    background: #d1fae5;
}

.level-card.level-blue.selected {
    border-color: #3b82f6;
    background: #dbeafe;
}

.level-card.level-purple.selected {
    border-color: #8b5cf6;
    background: #ede9fe;
}

.level-card.level-orange.selected {
    border-color: #f59e0b;
    background: #fef3c7;
}

.level-number {
    font-size: var(--font-size-lg);
    font-weight: 700;
    margin-bottom: var(--spacing-xs);
}

.level-name {
    font-size: var(--font-size-base);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.level-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
}

/* Settings */
.settings-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
}

.settings-group label {
    font-weight: 500;
}

.input-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.input-btn {
    width: 36px;
    height: 36px;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-lg);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-btn:hover {
    background: var(--color-primary-dark);
}

#questionCount {
    width: 80px;
    text-align: center;
    font-weight: 600;
}

.cooldown-select {
    padding: 0.5rem 0.75rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    background: var(--color-surface);
    cursor: pointer;
    transition: all var(--transition-base);
    outline: none;
}

.cooldown-select:hover {
    border-color: var(--color-primary);
}

.cooldown-select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

.cooldown-info {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-style: italic;
    margin-left: var(--spacing-sm);
}

.settings-actions {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: center;
}

.settings-btn {
    padding: 0.5rem 1rem;
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-base);
}

.settings-btn:hover {
    background: var(--color-bg);
    border-color: var(--color-primary);
    transform: translateY(-1px);
}

.settings-btn:active {
    transform: translateY(0);
}

/* ===== PRACTICE SCREEN ===== */
.practice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--color-border);
}

.progress-info {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-primary);
}

.question-counter {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.level-display {
    display: inline-block;
    margin-left: var(--spacing-md);
    padding: 0.375rem 0.75rem;
    background: var(--color-primary-light);
    color: var(--color-primary);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 2px solid var(--color-primary);
}

.score-display {
    display: flex;
    gap: var(--spacing-lg);
}

.score-item {
    text-align: center;
}

.score-value {
    font-size: 1.75rem;
    font-weight: 700;
}

.score-item.correct .score-value {
    color: var(--color-success);
}

.score-item.incorrect .score-value {
    color: var(--color-error);
}

.score-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Progress Bar */
.progress-bar {
    height: 8px;
    background: var(--color-border);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: var(--spacing-lg);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-success) 0%, var(--color-primary) 100%);
    transition: width var(--transition-slow);
}

/* Question Card */
.question-container {
    max-width: 800px;
    margin: 0 auto;
}

.question-card {
    background: var(--color-bg);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
}

.question-type {
    display: inline-block;
    background: var(--color-primary-light);
    color: var(--color-primary);
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.question-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--spacing-lg);
    line-height: 1.4;
}

.question-hint {
    background: #fef3c7;
    border-left: 4px solid var(--color-warning);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: #92400e;
}

/* Answer Area */
.answer-area {
    margin-bottom: var(--spacing-md);
}

.answer-options {
    display: grid;
    gap: var(--spacing-sm);
}

.answer-btn {
    padding: 1rem 1.5rem;
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-lg);
    font-weight: 500;
    text-align: left;
    color: var(--color-text);
}

.answer-btn:hover:not(:disabled) {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    transform: translateX(4px);
}

.answer-btn.correct {
    background: var(--color-success);
    color: white;
    border-color: var(--color-success);
}

.answer-btn.incorrect {
    background: var(--color-error);
    color: white;
    border-color: var(--color-error);
}

.text-input {
    width: 100%;
    font-size: var(--font-size-xl);
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
}

.submit-btn {
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-weight: 600;
}

.submit-btn:hover:not(:disabled) {
    background: var(--color-primary-dark);
}

/* Keyboard container */
#keyboardContainer {
    /* Container for on-screen keyboard - hidden on desktop */
}

/* Feedback */
.feedback-area {
    margin-top: var(--spacing-md);
}

.feedback {
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-lg);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

.feedback-correct {
    background: var(--color-success-light);
    color: #065f46;
    border: 2px solid var(--color-success);
}

.feedback-incorrect {
    background: var(--color-error-light);
    color: #991b1b;
    border: 2px solid var(--color-error);
}

.feedback-icon {
    font-size: 1.5rem;
    font-weight: 700;
}

.next-btn {
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: var(--color-success);
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-weight: 600;
}

.next-btn:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

/* ===== RESULTS SCREEN ===== */
.results-container {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
}

.results-icon {
    font-size: 5rem;
    margin-bottom: var(--spacing-md);
    animation: bounceIn 0.6s ease;
}

@keyframes bounceIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.results-title {
    margin-bottom: var(--spacing-xl);
}

.results-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.stat-card {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
}

.stat-card.primary {
    background: var(--color-primary-light);
    border-color: var(--color-primary);
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
}

.stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.performance-card {
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    color: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-xl);
}

.performance-card.performance-excellent {
    background: linear-gradient(135deg, #10b981, #059669);
}

.performance-card.performance-good {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.performance-card.performance-okay {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.performance-card.performance-needs-work {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.performance-title {
    color: white;
    font-size: 1.75rem;
    margin-bottom: var(--spacing-sm);
}

.performance-message {
    color: rgba(255, 255, 255, 0.95);
    font-size: var(--font-size-lg);
}

.results-details {
    background: var(--color-bg);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.detail-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) 0;
    font-size: var(--font-size-base);
}

.detail-icon {
    font-size: 1.25rem;
}

.results-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
}

.action-btn {
    padding: 0.875rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-weight: 600;
}

```
