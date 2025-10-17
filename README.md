# UK Maths Practice Application

A UK National Curriculum-aligned mathematics practice application that generates unlimited questions across multiple difficulty levels. Built with pure JavaScript ES6 modules, no build process required.

## 🎯 Features

- **Curriculum Aligned**: Questions map directly to UK National Curriculum statements (KS1 & KS2)
- **Progressive Difficulty**: 4 levels per topic (Beginning, Developing, Meeting, Exceeding)
- **Infinite Questions**: Parameter-driven generation ensures unique practice sets
- **Instant Feedback**: Immediate validation with detailed feedback
- **No Installation**: Runs entirely in the browser, no backend required

## 📚 Currently Implemented Modules

### Number and Place Value
- **N01 series**: Counting in multiples (Years 1-5)
- **N02 series**: Read, write, order and compare numbers (Years 2-6)
- **N03 series**: Place value (Years 2-6)
- **N04 series**: Representation, estimation, and rounding (Years 1-6)

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
