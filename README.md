# UK Maths Practice Application

A production-ready interactive mathematics practice application for UK Key Stage 1 & 2 students (ages 5-11).

## 🎯 Features

- **4 Curriculum Modules**: Counting, Number Bonds, Multiplication, Fractions
- **4 Difficulty Levels**: Beginning, Developing, Meeting, Exceeding
- **Parameter-Based Architecture**: Generates unlimited unique questions
- **Modern ES6 Modules**: Clean, maintainable code structure
- **Responsive Design**: Optimized for tablets (iPad) and desktop
- **Offline Capable**: Works without internet after first load
- **No Dependencies**: Pure HTML/CSS/JavaScript

## 📁 Project Structure

```
question-generator/
├── index.html                 # Main entry point
├── src/
│   ├── curriculum/
│   │   └── modules.js         # Module definitions & parameters
│   ├── generators/
│   │   ├── counting.js        # Counting question generator
│   │   ├── bonds.js           # Number bonds generator
│   │   ├── multiply.js        # Multiplication generator
│   │   └── fractions.js       # Fractions generator
│   ├── core/
│   │   ├── questionEngine.js  # Question generation orchestration
│   │   └── validator.js       # Answer validation
│   └── ui/
│       ├── setupScreen.js     # Setup screen component
│       ├── practiceScreen.js  # Practice screen component
│       ├── resultsScreen.js   # Results screen component
│       └── app.js             # Main app initialization
├── styles/
│   ├── main.css               # Core styles (light theme)
│   ├── screens.css            # Screen-specific styles
│   └── responsive.css         # Tablet/mobile responsive styles
└── docs/                      # Documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (required for ES6 modules)

### Installation & Running

#### Option 1: Using Python (Recommended)

```bash
# Navigate to project directory
cd question-generator

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

#### Option 2: Using Node.js

```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to project directory
cd question-generator

# Start server
http-server -p 8000

# Then open: http://localhost:8000
```

#### Option 3: Using VS Code

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Important Note

⚠️ **ES6 modules require a web server**. Opening `index.html` directly with `file://` protocol will not work due to CORS restrictions.

## 🎮 How to Use

1. **Choose a Topic**: Select from Counting, Number Bonds, Multiplication, or Fractions
2. **Choose Difficulty**: Select from 4 difficulty levels (1-4)
3. **Set Question Count**: Choose 1-20 questions
4. **Start Practice**: Click "Start Practice" to begin
5. **Answer Questions**: Type answers or select from multiple choice
6. **View Results**: See your score and performance feedback
7. **Practice Again**: Retry with same settings or change topic

## 📐 Curriculum Modules

### 1. Counting (Year 1)
- **Level 1**: Count to 30 in steps of 1, 2, 5, 10
- **Level 2**: Count to 50 forwards and backwards
- **Level 3**: Count to 100 with varied step sizes
- **Level 4**: Count to 200 with steps of 1, 2, 3, 5, 10

### 2. Number Bonds (Year 1)
- **Level 1**: Bonds to 5 and 10 (addition only)
- **Level 2**: Bonds to 10 with subtraction
- **Level 3**: Bonds to 10 and 20
- **Level 4**: Bonds to 20 with all operations

### 3. Multiplication (Year 3)
- **Level 1**: 2, 5, 10 times tables up to ×5
- **Level 2**: 2, 3, 4, 5, 10 times tables up to ×10
- **Level 3**: 3, 4, 8 times tables up to ×12 with division
- **Level 4**: 6, 7, 8, 9 times tables up to ×12 with division

### 4. Fractions (Year 4)
- **Level 1**: Halves and quarters
- **Level 2**: Halves, thirds, quarters, fifths
- **Level 3**: Denominators up to 8 with simplification
- **Level 4**: Denominators up to 9 with simplification

## 🏗️ Architecture

### Three-Component System

```
CURRICULUM PARAMETERS (modules.js)
    ↓ defines ranges and constraints
QUESTION TEMPLATES (generators/)
    ↓ generates questions
DELIVERY APPLICATION (ui/)
    ↓ presents to students
```

### Design Patterns

- **Registry Pattern**: QuestionEngine registers and manages generators
- **Component Pattern**: Each screen is a self-contained component
- **Event-Driven**: Screens communicate via custom events
- **Pure Functions**: Generators are side-effect free
- **Separation of Concerns**: Clear boundaries between layers

## 🎨 Design System

- **Light Theme**: Modern, clean, Apple-esque aesthetic
- **Color Palette**: Blue primary, green success, red error
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent 8px grid system
- **Responsive**: Mobile-first with tablet optimization

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome for Android 90+

## 🔜 Roadmap (Future Phases)

### ✅ Phase 1: Question Deduplication (COMPLETE)
- ✅ Prevent duplicate questions within configurable time period
- ✅ Track question history in localStorage
- ✅ Fingerprinting system for unique question identification
- ✅ Configurable cooldown (1 hour to 1 week, default: 24 hours)
- ✅ Settings UI with dropdown selector
- ✅ Clear history function
- ✅ View statistics (questions tracked, timestamps)
- ✅ Automatic cleanup of expired entries
- ✅ Persistent across browser sessions

### Phase 2: On-Screen Keyboard
- iPad-friendly calculator-style keyboard
- Optimized for touch input

### Phase 3: Auto Level-Up System
- Progress to next level after 3 consecutive correct answers
- Animated power-up button

### Phase 4: Enhanced Question Types
- Drag-and-drop ordering
- Select multiple (checkboxes)
- True/false
- Matching pairs
- Number line click

### Phase 5: Hints System
- Progressive hints (3 levels per question)
- Hints unlock progressively (level 1 → 2 → 3)
- Types: strategy, visual, breakdown, range
- Score adjustment for hint usage (10% reduction per hint)
- Auto-generate hints based on question type
- Hints guide thinking without giving away answers

### Phase 6: Timer System
- Optional timer for practice sessions
- Configurable time limits per question
- Visual countdown display
- Time pressure mode for advanced students
- Track time spent per question
- Performance analytics based on time
- Pause/resume functionality

### Phase 7: Progress Persistence
- Save student progress locally
- Track performance over time
- Export/import progress data

### Phase 8: Teacher Dashboard
- View class progress
- Aggregate student data
- Export class reports
- Import student session files
- Class overview statistics
- Per-student performance tracking

## 📄 License

This project is provided as-is for educational use.

## 🤝 Contributing

This is a closed educational project. For questions or issues, please contact the development team.

## 📞 Support

For technical support or questions about the curriculum, please refer to the documentation in the `docs/` folder.

---

**Built with ❤️ for UK educators and students**
