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