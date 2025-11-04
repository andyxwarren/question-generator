const fs = require('fs');

// Load reference data
const reference = JSON.parse(fs.readFileSync('references/national_curriculum_framework_excel.json', 'utf8'));
const refMap = {};
reference.forEach(item => {
  refMap[item.Uid] = {
    year: item.Year,
    strand: item.Strand,
    substrand: item.Substrand,
    ref: item['Content domain reference'],
    module: item.Module
  };
});

// Module descriptions from implementations (extracted from parameter files earlier)
const implDescriptions = {
  'N01_Y1_NPV': 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
  'N01_Y2_NPV': 'Count in steps of 2, 3, and 5 from 0, and in tens from any number, forward and backward',
  'N01_Y3_NPV': 'Count from 0 in multiples of 4, 8, 50 and 100',
  'N01_Y4_NPV': 'Count in multiples of 6, 7, 9, 25 and 1000',
  'N01_Y5_NPV': 'Count forwards and backwards with positive and negative whole numbers, including through zero',
  'N02_Y2_NPV': 'Read and write numbers to at least 100 in numerals and in words',
  'N02_Y3_NPV': 'Read and write numbers up to 1000 in numerals and in words',
  'N02_Y4_NPV': 'Order and compare numbers beyond 1000',
  'N02_Y5_NPV': 'Read, write, order and compare numbers to at least 1,000,000 and determine the value of each digit',
  'N02_Y6_NPV': 'Read, write, order and compare numbers up to 10,000,000 and determine the value of each digit',
  'N03_Y2_NPV': 'Recognise the place value of each digit in a two-digit number (tens, ones)',
  'N03_Y3_NPV': 'Recognise the place value of each digit in a three-digit number (hundreds, tens, ones)',
  'N03_Y4_NPV': 'Recognise the place value of each digit in a four-digit number; read Roman numerals to 100 (I to C)',
  'N03_Y5_NPV': 'Determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M)',
  'N03_Y6_NPV': 'Determine the value of each digit in numbers up to 10,000,000',
  'N04_Y1_NPV': 'Identify and represent numbers using objects and pictorial representations including the number line, and use the language of: equal to, more than, less than (fewer), most, least',
  'N04_Y2_NPV': 'Identify, represent and estimate numbers using different representations, including the number line',
  'N04_Y3_NPV': 'Identify, represent and estimate numbers using different representations',
  'N04_Y4_NPV': 'Identify, represent and estimate numbers using different representations; round any number to the nearest 10, 100 or 1,000',
  'N04_Y5_NPV': 'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000',
  'N04_Y6_NPV': 'Round any whole number to a required degree of accuracy',
  'N05_Y4_NPV': 'Count backwards through zero to include negative numbers',
  'N05_Y5_NPV': 'Interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero',
  'N05_Y6_NPV': 'Use negative numbers in context, and calculate intervals across zero',
  'N06_Y2_NPV': 'Use place value and number facts to solve problems',
  'N06_Y3_NPV': 'Solve number problems and practical problems involving 3N1-3N4',
  'N06_Y4_NPV': 'Solve number and practical problems that involve 4N1-4N5 and with increasingly large positive numbers',
  'N06_Y5_NPV': 'Solve number problems and practical problems that involve 5N1-5N5',
  'N06_Y6_NPV': 'Solve number problems and practical problems that involve 6N2-6N5',
  'C01_Y1_CALC': 'Represent and use number bonds and related subtraction facts within 20',
  'C01_Y2_CALC': 'Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100',
  'C01_Y3_CALC': 'Add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds',
  'C01_Y5_CALC': 'Add and subtract numbers mentally with increasingly large numbers',
  'C02_Y1_CALC': 'Add and subtract one-digit and two-digit numbers to 20, including zero; read, write and interpret mathematical statements involving addition (+), subtraction (–) and equals (=) signs'
};

// Check for misalignments
const misalignments = [];

Object.keys(implDescriptions).forEach(uid => {
  const ref = refMap[uid];
  const implDesc = implDescriptions[uid];
  
  if (!ref) {
    misalignments.push({
      type: 'MISSING_FROM_REFERENCE',
      uid: uid,
      message: 'Module implemented but not in reference JSON'
    });
    return;
  }
  
  // Normalize and compare descriptions
  const normalize = str => str.toLowerCase().trim().replace(/\s+/g, ' ');
  const refDesc = normalize(ref.module);
  const impDesc = normalize(implDesc);
  
  if (refDesc !== impDesc && ref.module) {
    misalignments.push({
      type: 'DESCRIPTION_MISMATCH',
      uid: uid,
      expected: ref.module,
      actual: implDesc
    });
  }
});

console.log(JSON.stringify(misalignments, null, 2));
