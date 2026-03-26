// test.js — Ju Solfège unit tests (run with: node test.js)
const js = require('./index.js');

let pass = 0, fail = 0;
function assert(label, got, expected) {
  if (got === expected) {
    console.log(`  ✅ ${label}: "${got}"`);
    pass++;
  } else {
    console.error(`  ❌ ${label}: expected "${expected}" got "${got}"`);
    fail++;
  }
}

console.log('\n═══ Ju Solfège Core Tests ════════════════════════════════\n');

console.log('── juSolfege() ──');
assert('C4  sharp',  js.juSolfege(60, 'sharp'),      'Do');
assert('C#4 sharp',  js.juSolfege(61, 'sharp'),      'Di');
assert('Db4 flat',   js.juSolfege(61, 'flat'),       'Du');
assert('D4  sharp',  js.juSolfege(62, 'sharp'),      'Re');
assert('D#4 sharp',  js.juSolfege(63, 'sharp'),      'Ri');
assert('Eb4 flat',   js.juSolfege(63, 'flat'),       'Ru');
assert('E4  sharp',  js.juSolfege(64, 'sharp'),      'Mi');
assert('F4  sharp',  js.juSolfege(65, 'sharp'),      'Fa');
assert('F#4 sharp',  js.juSolfege(66, 'sharp'),      'Fi');
assert('Gb4 flat',   js.juSolfege(66, 'flat'),       'Fu');
assert('G4  sharp',  js.juSolfege(67, 'sharp'),      'Sol');
assert('G#4 sharp',  js.juSolfege(68, 'sharp'),      'Si');
assert('Ab4 flat',   js.juSolfege(68, 'flat'),       'Su');
assert('A4  sharp',  js.juSolfege(69, 'sharp'),      'La');
assert('A#4 sharp',  js.juSolfege(70, 'sharp'),      'Li');
assert('Bb4 flat',   js.juSolfege(70, 'flat'),       'Lu');
assert('B4  sharp',  js.juSolfege(71, 'sharp'),      'Ti');
assert('C5  sharp',  js.juSolfege(72, 'sharp'),      'Do');

console.log('\n── juSolfege() with octave ──');
assert('C4 octave',  js.juSolfege(60, 'sharp', true), 'Do4');
assert('Di4 octave', js.juSolfege(61, 'sharp', true), 'Di4');

console.log('\n── toSolfege() multi-system ──');
assert('American D#', js.toSolfege(63, 'american'), 'Ri');
assert('British  D#', js.toSolfege(63, 'british'),  'Ri');
assert('Thai     C',  js.toSolfege(60, 'thai'),     'โด');
assert('Num      F#', js.toSolfege(66, 'num'),      '4#');

console.log('\n── fromNoteName() ──');
assert('C#4 → Di', js.fromNoteName('C#4').syllable,     'Di');
assert('Bb3 → Lu', js.fromNoteName('Bb3','flat').syllable, 'Lu');
assert('G#5 → Si', js.fromNoteName('G#5').syllable,     'Si');

console.log('\n── labelMelody() ──');
const mel = js.labelMelody([60, 62, 64, 65, 67]);
assert('Melody[0]', mel[0], 'Do');
assert('Melody[4]', mel[4], 'Sol');

console.log('\n── SYSTEM_INFO ──');
assert('Inventor', js.SYSTEM_INFO.inventor, 'Paisan Chamnong (JiewJumnong)');

console.log(`\n═══════════════════════════════════════════════════════════`);
console.log(`Result: ${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
