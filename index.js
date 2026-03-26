/**
 * Ju Solfège Chromatic — Core Library
 * =====================================
 * A fixed-doh chromatic solfège system invented by Paisan Chamnong (JiewJumnong).
 *
 * Core Rule:
 *   - Diatonic notes: Do  Re  Mi  Fa  Sol  La  Ti
 *   - Chromatic SHARPS replace the main vowel with  'i'  →  Di  Ri  Fi  Si  Li
 *   - Chromatic FLATS  replace the main vowel with  'u'  →  Du  Ru  Fu  Su  Lu
 *
 * Copyright (c) 2025 Paisan Chamnong (JiewJumnong)
 * MIT License — https://github.com/JiewJumnong/ju-solfege
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// PITCH CLASS TABLES  (index 0 = C,  1 = C#/Db,  … ,  11 = B)
// ─────────────────────────────────────────────────────────────────────────────

/** Ju Solfège — Sharp variant (chromatic alterations rendered with vowel 'i') */
const JU_SHARP = [
  'Do', 'Di', 'Re', 'Ri', 'Mi',
  'Fa', 'Fi', 'Sol', 'Si', 'La', 'Li', 'Ti'
];

/** Ju Solfège — Flat variant (chromatic alterations rendered with vowel 'u') */
const JU_FLAT = [
  'Do', 'Ru', 'Re', 'Mu', 'Mi',
  'Fa', 'Su', 'Sol', 'Lu', 'La', 'Tu', 'Ti'
];

/** American Fixed-doh Chromatic (for comparison reference) */
/** Ju Solfège — Alternative Spelling */
const JU_SHARP_ALT = [
  'Doh', 'di', 'Re', 'ri', 'Mi',
  'Fah', 'fi', 'Sol', 'si', 'Lah', 'li', 'Ti'
];

const JU_FLAT_ALT = [
  'Doh', 'ru', 'Re', 'mu', 'Mi',
  'Fah', 'su', 'Sol', 'lu', 'Lah', 'tu', 'Ti'
];

const AMERICAN = [
  'Do', 'Di', 'Re', 'Ri', 'Mi',
  'Fa', 'Fi', 'Sol', 'Si', 'La', 'Li', 'Ti'
];

/** British / English Tonic Sol-fa Chromatic */
const BRITISH = [
  'Doh', 'Di', 'Ray', 'Ri', 'Me',
  'Fah', 'Fi', 'Soh', 'Si', 'Lah', 'Li', 'Ti'
];

/** Thai Solfège */
const THAI = [
  'โด', 'โด#', 'เร', 'เร#', 'มี',
  'ฟา', 'ฟา#', 'ซอล', 'ซอล#', 'ลา', 'ลา#', 'ที'
];

/** Western Do Re Mi (non-chromatic accidentals) */
const WESTERN = [
  'Do', 'Do#', 'Re', 'Re#', 'Mi',
  'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Ti'
];

/** Jianpu / Numeric */
const JIANPU = ['1', '1#', '2', '2#', '3', '4', '4#', '5', '5#', '6', '6#', '7'];

/** Western pitch names (sharp) */
const PITCH_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** Western pitch names (flat) */
const PITCH_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// ─────────────────────────────────────────────────────────────────────────────
// CORE FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a MIDI note number (0–127) to a Ju Solfège name.
 *
 * @param {number} midi       MIDI note number (e.g. 60 = C4)
 * @param {'sharp'|'flat'}  [variant='sharp']  Use sharp or flat table
 * @param {boolean}          [octave=false]     Append octave number (e.g. "Di4")
 * @returns {string}  e.g. "Di", "Ru", "Sol3"
 *
 * @example
 * juSolfege(61);              // => "Di"   (C#4, sharp variant)
 * juSolfege(61, 'flat');      // => "Du"   (Db4, flat variant)
 * juSolfege(61, 'sharp', true); // => "Di4"
 */
function juSolfege(midi, variant = 'sharp', octave = false) {
  const pc   = ((midi % 12) + 12) % 12;
  const oct  = Math.floor(midi / 12) - 1;
  const name = variant === 'flat' ? JU_FLAT[pc] : JU_SHARP[pc];
  return octave ? name + oct : name;
}

/**
 * Convert a MIDI note number to any supported solfège system.
 *
 * @param {number} midi
 * @param {'ju_sharp'|'ju_flat'|'american'|'british'|'thai'|'western'|'num'|'pitch'} system
 * @param {boolean} [octave=false]
 * @returns {string}
 *
 * @example
 * toSolfege(62, 'american');  // => "Re"
 * toSolfege(63, 'ju_sharp');  // => "Ri"
 * toSolfege(63, 'ju_flat');   // => "Ru"
 * toSolfege(63, 'british');   // => "Ri"
 */
function toSolfege(midi, system = 'ju_sharp', octave = false) {
  const pc  = ((midi % 12) + 12) % 12;
  const oct = Math.floor(midi / 12) - 1;

  const TABLE = {
    ju_sharp: JU_SHARP,  ju: JU_SHARP,
    ju_flat:  JU_FLAT,
    ju_sharp_alt: JU_SHARP_ALT, ju_alt: JU_SHARP_ALT,
    ju_flat_alt: JU_FLAT_ALT,
    american: AMERICAN,  us: AMERICAN,
    british:  BRITISH,   english: BRITISH,
    thai:     THAI,
    western:  WESTERN,
    num:      JIANPU,
    pitch:    PITCH_SHARP,
    pitch_flat: PITCH_FLAT,
  };

  const table = TABLE[system.toLowerCase()] || JU_SHARP;
  const name  = table[pc];
  return octave ? name + oct : name;
}

/**
 * Convert pitch class (0–11) to Ju Solfège name.
 * @param {number} pc  Pitch class 0–11  (0=C, 1=C#, …, 11=B)
 * @param {'sharp'|'flat'} [variant='sharp']
 * @returns {string}
 */
function fromPitchClass(pc, variant = 'sharp') {
  const i = ((pc % 12) + 12) % 12;
  return variant === 'flat' ? JU_FLAT[i] : JU_SHARP[i];
}

/**
 * Convert a note name string (e.g. "C#4", "Bb3") to Ju Solfège.
 * @param {string} noteName  Western note name with optional octave
 * @param {'sharp'|'flat'} [variant='sharp']
 * @returns {{ syllable: string, octave: number|null }}
 *
 * @example
 * fromNoteName("C#4");   // => { syllable: "Di",  octave: 4 }
 * fromNoteName("Bb3", 'flat'); // => { syllable: "Lu", octave: 3 }
 */
function fromNoteName(noteName, variant = 'sharp') {
  const match = noteName.trim().match(/^([A-Ga-g])(#|b)?(-?\d+)?$/);
  if (!match) return { syllable: '?', octave: null };

  const note = match[1].toUpperCase();
  const acc  = match[2] || '';
  const oct  = match[3] !== undefined ? parseInt(match[3]) : null;

  const BASE = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 };
  let pc = BASE[note] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0);
  pc     = ((pc % 12) + 12) % 12;

  return { syllable: fromPitchClass(pc, variant), octave: oct };
}

/**
 * Generate the full Ju Solfège chromatic scale starting from a root note.
 * @param {number} [rootMidi=60]  Root MIDI note (default C4)
 * @param {'sharp'|'flat'} [variant='sharp']
 * @returns {Array<{midi:number, syllable:string, pitch:string}>}
 *
 * @example
 * chromaticScale(60, 'sharp');
 * // [ { midi:60, syllable:'Do',  pitch:'C4' },
 * //   { midi:61, syllable:'Di',  pitch:'C#4' }, … ]
 */
function chromaticScale(rootMidi = 60, variant = 'sharp') {
  return Array.from({ length: 12 }, (_, i) => {
    const m    = rootMidi + i;
    const pc   = m % 12;
    const oct  = Math.floor(m / 12) - 1;
    const arr  = variant === 'flat' ? PITCH_FLAT : PITCH_SHARP;
    return {
      midi:     m,
      syllable: fromPitchClass(pc, variant),
      pitch:    arr[pc] + oct,
    };
  });
}

/**
 * Convert an array of MIDI notes to Ju Solfège syllables.
 * Useful for labelling entire melodies.
 *
 * @param {number[]} midiArray
 * @param {'sharp'|'flat'} [variant='sharp']
 * @param {boolean} [octave=false]
 * @returns {string[]}
 *
 * @example
 * labelMelody([60, 62, 64, 65]);
 * // => ['Do', 'Re', 'Mi', 'Fa']
 */
function labelMelody(midiArray, variant = 'sharp', octave = false) {
  return midiArray.map(m => juSolfege(m, variant, octave));
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCE TABLES (exported for documentation / display purposes)
// ─────────────────────────────────────────────────────────────────────────────

const TABLES = {
  JU_SHARP, JU_FLAT,
  AMERICAN, BRITISH, THAI, WESTERN, JIANPU,
  PITCH_SHARP, PITCH_FLAT,
};

/** Full system metadata */
const SYSTEM_INFO = {
  name:      'Ju Solfège Chromatic',
  version:   '1.0.0',
  inventor:  'Paisan Chamnong (JiewJumnong)',
  year:      2025,
  copyright: 'Copyright (c) 2025 Paisan Chamnong (JiewJumnong)',
  license:   'MIT',
  rule: {
    sharp: "Chromatic sharp notes replace the main vowel with 'i' (Di, Ri, Fi, Si, Li)",
    flat:  "Chromatic flat  notes replace the main vowel with 'u' (Ru, Mu, Su, Lu, Tu)",
  },
  diatonic:  ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
  chromatic_sharp: JU_SHARP,
  chromatic_flat:  JU_FLAT,
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

// CommonJS (Node.js / require)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    juSolfege, toSolfege, fromPitchClass, fromNoteName,
    chromaticScale, labelMelody,
    TABLES, SYSTEM_INFO,
  };
}

// ESM / Browser global
if (typeof window !== 'undefined') {
  window.JuSolfege = {
    juSolfege, toSolfege, fromPitchClass, fromNoteName,
    chromaticScale, labelMelody,
    TABLES, SYSTEM_INFO,
  };
}
