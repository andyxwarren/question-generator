#!/usr/bin/env node

/**
 * Question Generator CLI
 *
 * Generate UK National Curriculum mathematics questions via command line.
 *
 * Usage:
 *   node generate.js --module N01_Y3_NPV --level 3 --count 10
 *   node generate.js --strand Number --year 3 --format pretty
 *   node generate.js --list --strand Calculation
 *   node generate.js --help
 */

import { writeFileSync } from 'fs';
import {
    generate,
    filterModules,
    listModules,
    getStrands,
    getSubstrands,
    formatAsJson,
    formatAsCsv,
    formatAsPretty,
    formatModuleList
} from './src/export/index.js';
import { DEFAULT_LOCALE, listLocales } from './src/i18n/index.js';

// =============================================================================
// Argument Parsing
// =============================================================================

function parseArgs(argv) {
    const args = {
        module: null,
        strand: null,
        substrand: null,
        year: null,
        level: null,
        levels: null,
        count: 10,
        format: 'json',
        output: null,
        locale: DEFAULT_LOCALE,
        list: false,
        listLocales: false,
        help: false
    };

    for (let i = 2; i < argv.length; i++) {
        const arg = argv[i];
        const nextArg = argv[i + 1];

        switch (arg) {
            case '--module':
            case '-m':
                args.module = nextArg;
                i++;
                break;
            case '--strand':
            case '-s':
                args.strand = nextArg;
                i++;
                break;
            case '--substrand':
                args.substrand = nextArg;
                i++;
                break;
            case '--year':
            case '-y':
                args.year = parseInt(nextArg, 10);
                i++;
                break;
            case '--level':
            case '-l':
                args.level = parseInt(nextArg, 10);
                i++;
                break;
            case '--levels':
                args.levels = nextArg.split(',').map(n => parseInt(n.trim(), 10));
                i++;
                break;
            case '--count':
            case '-c':
                args.count = parseInt(nextArg, 10);
                i++;
                break;
            case '--format':
            case '-f':
                args.format = nextArg;
                i++;
                break;
            case '--output':
            case '-o':
                args.output = nextArg;
                i++;
                break;
            case '--list':
                args.list = true;
                break;
            case '--locale':
                args.locale = nextArg;
                i++;
                break;
            case '--list-locales':
                args.listLocales = true;
                break;
            case '--help':
            case '-h':
                args.help = true;
                break;
        }
    }

    // Normalize levels
    if (args.level && !args.levels) {
        args.levels = [args.level];
    }
    if (!args.levels) {
        args.levels = [1, 2, 3, 4]; // Default: all levels
    }

    return args;
}

// =============================================================================
// Help Text
// =============================================================================

function showHelp() {
    console.log(`
Question Generator CLI - UK National Curriculum Mathematics

USAGE:
  node generate.js [options]

FILTER OPTIONS:
  --module, -m <id>       Specific module ID (e.g., N01_Y3_NPV)
  --strand, -s <name>     Filter by strand (Number, Calculation, Measurement)
  --substrand <name>      Filter by substrand
  --year, -y <n>          Filter by year group (1-6)

GENERATION OPTIONS:
  --level, -l <n>         Single difficulty level (1-4)
  --levels <n,n,n>        Multiple levels (e.g., 1,2,3,4)
  --count, -c <n>         Questions per module/level (default: 10)

OUTPUT OPTIONS:
  --format, -f <type>     Output format: json, csv, pretty (default: json)
  --output, -o <file>     Write to file instead of stdout
  --locale <id>           Locale for formatting (default: en-GB)
                          Available: en-GB (UK), en-US (US)

OTHER:
  --list                  List available modules (apply filters to narrow)
  --list-locales          List available locales
  --help, -h              Show this help message

EXAMPLES:

  BASIC GENERATION:
    # Generate 5 questions from specific module, level 3
    node generate.js --module N01_Y1_NPV --level 3 --count 5 --format pretty

    # Generate questions for all levels of a module
    node generate.js --module N01_Y1_NPV --count 3 --format pretty

    # Generate level 1 and 2 questions only (Beginning/Developing)
    node generate.js --module N01_Y1_NPV --levels 1,2 --count 5

  FILTERING BY STRAND/YEAR:
    # All Year 1 Number questions, pretty output
    node generate.js --strand Number --year 1 --format pretty

    # All Year 3 modules across all strands
    node generate.js --year 3 --count 5 --format pretty

    # All Calculation modules for Year 2
    node generate.js --strand Calculation --year 2 --format pretty

    # Filter by substrand
    node generate.js --substrand "counting (in multiples)" --year 1

  LISTING MODULES:
    # List all available modules
    node generate.js --list

    # List Year 1 modules only
    node generate.js --list --year 1

    # List all Measurement modules
    node generate.js --list --strand Measurement

    # List Number modules for Year 3
    node generate.js --list --strand Number --year 3

  FILE OUTPUT:
    # Save to JSON file
    node generate.js --module N01_Y1_NPV --level 3 --output questions.json

    # Export all Year 4 questions to CSV
    node generate.js --year 4 --format csv --output year4-questions.csv

    # Generate homework worksheet (pretty format to text file)
    node generate.js --year 2 --level 2 --count 10 --format pretty --output homework.txt

  MULTIPLE LEVELS:
    # Generate questions across multiple specific levels
    node generate.js --module N01_Y1_NPV --levels 1,3,4 --count 3

    # All Year 1 questions, levels 1-2 only (for struggling students)
    node generate.js --year 1 --levels 1,2 --format pretty

    # Challenge questions only (level 4)
    node generate.js --year 3 --level 4 --count 5 --format pretty

  TEACHER WORKFLOWS:
    # Create differentiated practice sets for Year 1 counting
    node generate.js --module N01_Y1_NPV --level 1 --count 10 --output easy.json
    node generate.js --module N01_Y1_NPV --level 3 --count 10 --output medium.json
    node generate.js --module N01_Y1_NPV --level 4 --count 10 --output hard.json

    # Generate full assessment for Year 2 Number strand
    node generate.js --strand Number --year 2 --count 5 --format csv --output y2-number-assessment.csv

    # Quick practice questions for today's lesson
    node generate.js --module N01_Y1_NPV --level 2 --count 5 --format pretty

  BULK CSV EXPORTS (questions per module per level):
    # Export ALL modules, all strands, all levels (comprehensive)
    node generate.js --count 3 --format csv --output all-questions.csv

    # Export by strand (all years, all levels)
    node generate.js --strand "Number" --count 3 --format csv --output number-questions.csv
    node generate.js --strand "Calculation" --count 3 --format csv --output calculation-questions.csv
    node generate.js --strand "Measurement" --count 3 --format csv --output measurement-questions.csv

    # Export by year group (all strands, all levels)
    node generate.js --year 1 --count 3 --format csv --output year1-questions.csv
    node generate.js --year 2 --count 3 --format csv --output year2-questions.csv
    node generate.js --year 3 --count 3 --format csv --output year3-questions.csv

    # Export by strand + year
    node generate.js --strand "Number" --year 1 --count 3 --format csv --output y1-number.csv
    node generate.js --strand "Number" --year 2 --count 3 --format csv --output y2-number.csv

    # Export specific difficulty levels only
    node generate.js --count 3 --levels 1,2 --format csv --output beginner-questions.csv
    node generate.js --count 3 --level 3 --format csv --output curriculum-standard.csv
    node generate.js --count 3 --level 4 --format csv --output challenge-questions.csv

  NOTE: --count 3 generates 3 questions per module per level.
        Example: 5 modules × 4 levels × 3 questions = 60 total questions

  LOCALE/INTERNATIONALIZATION:
    # List available locales
    node generate.js --list-locales

    # Generate with US English formatting ($, ¢, L instead of £, p, l)
    node generate.js --module M01_Y4_MEAS --level 3 --locale en-US --format pretty

    # Export ALL modules to JSON with US locale (5 questions per level)
    node generate.js --count 5 --locale en-US --format json --output all-questions-us.json

    # Export ALL modules to CSV with UK locale (default, 10 questions per level)
    node generate.js --count 10 --locale en-GB --format csv --output all-questions-uk.csv

    # Export measurement modules only with US locale
    node generate.js --strand Measurement --count 5 --locale en-US --format csv --output measurements-us.csv

    # Export Year 4 modules with 3 questions per level, US locale
    node generate.js --year 4 --count 3 --locale en-US --format json --output year4-us.json

  LOCALE DIFFERENCES:
    en-GB (UK English):    £6.13, 89p, 2.5l, metre
    en-US (US English):    $6.13, 89¢, 2.5L, meter

    The locale affects:
    - Currency symbols (£ vs $) and minor units (p vs ¢)
    - Unit abbreviations (l vs L for liters/litres)
    - Spelling (metre vs meter, litre vs liter)
    - Decimal/thousands separators (future: . vs , in some locales)

DIFFICULTY LEVELS:
  1 = Beginning    (smallest ranges, most scaffolding)
  2 = Developing   (moderate complexity)
  3 = Meeting      (full curriculum expectation)
  4 = Exceeding    (extended challenge)
`);
}

// =============================================================================
// Main
// =============================================================================

function main() {
    const args = parseArgs(process.argv);

    // Help
    if (args.help) {
        showHelp();
        process.exit(0);
    }

    // List locales
    if (args.listLocales) {
        console.log('Available locales:');
        listLocales().forEach(loc => {
            const marker = loc.id === DEFAULT_LOCALE ? ' (default)' : '';
            console.log(`  ${loc.id} - ${loc.name}${marker}`);
        });
        process.exit(0);
    }

    // Build filters
    const filters = {};
    if (args.module) filters.moduleId = args.module;
    if (args.strand) filters.strand = args.strand;
    if (args.substrand) filters.substrand = args.substrand;
    if (args.year) filters.year = args.year;

    // List mode
    if (args.list) {
        const modules = listModules(filters);
        if (modules.length === 0) {
            console.log('No modules match the specified filters.');
            process.exit(0);
        }
        console.log(formatModuleList(modules));
        process.exit(0);
    }

    // Get matching modules
    const modules = filterModules(filters);

    if (modules.length === 0) {
        console.error('Error: No modules match the specified filters.');
        console.error('Use --list to see available modules, or --help for usage.');
        process.exit(1);
    }

    // Generate questions
    console.error(`Generating ${args.count} question(s) per level for ${modules.length} module(s)...`);
    console.error(`Levels: ${args.levels.join(', ')}`);
    console.error(`Locale: ${args.locale}`);

    const questions = generate({
        modules,
        levels: args.levels,
        count: args.count,
        locale: args.locale
    });

    if (questions.length === 0) {
        console.error('Warning: No questions were generated. Check module/level combinations.');
        process.exit(1);
    }

    console.error(`Generated ${questions.length} total question(s).`);

    // Format output
    let output;
    const metadata = { filters, levels: args.levels, locale: args.locale };

    switch (args.format) {
        case 'csv':
            output = formatAsCsv(questions, args.locale);
            break;
        case 'pretty':
            output = formatAsPretty(questions, args.locale);
            break;
        case 'json':
        default:
            output = formatAsJson(questions, metadata);
            break;
    }

    // Output to file or stdout
    if (args.output) {
        writeFileSync(args.output, output, 'utf-8');
        console.error(`Output written to: ${args.output}`);
    } else {
        console.log(output);
    }
}

main();
