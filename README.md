# UK Maths Practice Application

A UK National Curriculum-aligned mathematics practice application that generates unlimited questions across multiple difficulty levels. Built with pure JavaScript ES6 modules, no build process required.

## 🎯 Features

- **Curriculum Aligned**: Questions map directly to UK National Curriculum statements (KS1 & KS2)
- **Progressive Difficulty**: 4 levels per topic (Beginning, Developing, Meeting, Exceeding)
- **Infinite Questions**: Parameter-driven generation ensures unique practice sets
- **Instant Feedback**: Immediate validation with detailed feedback
- **Export Capability**: Save questions and results in CSV or JSON format
- **No Installation**: Runs entirely in the browser, no backend required

## 📚 Currently Implemented Modules

### Number and Place Value (N-series)
- **N01**: Counting in multiples (Years 1-5)
- **N02**: Read, write, order and compare numbers (Years 2-6)
- **N03**: Place value and Roman numerals (Years 2-6)
- **N04**: Representation, estimation, and rounding (Years 1-6)
- **N05**: Negative numbers (Years 4-6)
- **N06**: Number problems (Years 2-6)

### Calculations (C-series)
- **C01**: Mental addition and subtraction (Years 1-3, 5)
- **C02**: Written addition and subtraction methods (Years 1-5)
- **C03**: Estimation, inverses and checking (Years 2-6)
- **C04**: Addition and subtraction problem solving (Years 1-6)
- **C05**: Properties - multiples, factors, primes, squares, cubes (Years 5-6)
- **C06**: Mental multiplication and division (Years 2-6)
- **C07**: Written multiplication and division methods (Years 2-6)
- **C08**: Problem-solving with mathematical properties (Years 1-6)
- **C09**: Order of operations (Year 6)

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (required for ES6 modules)

### Installation & Running

#### Option 1: Using the Custom Server (Recommended)

This project includes a custom server script that simplifies the setup process.

```bash
# Navigate to the project directory and run the custom server
python custom_server.py
```

This will start the server and provide you with a direct link to open the application.

#### Option 2: Using Node.js

```bash
npx http-server -p 8000
# Then open: http://localhost:8000
```

#### Option 3: VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📖 Documentation

- **[USER_GUIDE.md](USER_GUIDE.md)** - For students and teachers using the application
- **[TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)** - Complete technical reference
- **[CLAUDE.md](CLAUDE.md)** - Development guidance for Claude Code

## 🏗️ Architecture

Three-layer parameter-based architecture:
1. **Curriculum Layer** (`parameters.js`) - Defines all modules with 4-level parameters
2. **Generator Layer** (`generators/`) - Pure functions that create questions
3. **Engine & UI Layer** - Orchestration, validation, and rendering

## 🤝 Contributing

New curriculum modules can be added by:
1. Defining parameters in `src/curriculum/parameters.js`
2. Creating a generator in `src/generators/`
3. Registering the generator in `src/core/questionEngine.js`

See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for detailed instructions.

## 📄 License

This project is educational software aligned with the UK National Curriculum Framework.
