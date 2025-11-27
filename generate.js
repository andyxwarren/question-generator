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
        list: false,
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

OTHER:
  --list                  List available modules (apply filters to narrow)
  --help, -h              Show this help message

EXAMPLES:
  # Generate Year 3 Number questions, all levels, pretty output
  node generate.js --strand Number --year 3 --format pretty

  # Generate specific module, level 3, save to file
  node generate.js --module N01_Y3_NPV --level 3 --output questions.json

  # List all Calculation modules
  node generate.js --list --strand Calculation

  # Generate CSV for all Year 4 modules
  node generate.js --year 4 --format csv --output y4-questions.csv

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

    const questions = generate({
        modules,
        levels: args.levels,
        count: args.count
    });

    if (questions.length === 0) {
        console.error('Warning: No questions were generated. Check module/level combinations.');
        process.exit(1);
    }

    console.error(`Generated ${questions.length} total question(s).`);

    // Format output
    let output;
    const metadata = { filters, levels: args.levels };

    switch (args.format) {
        case 'csv':
            output = formatAsCsv(questions);
            break;
        case 'pretty':
            output = formatAsPretty(questions);
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
