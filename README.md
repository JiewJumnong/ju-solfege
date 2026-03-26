# Ju Solfège Chromatic

> A chromatic solfège system where **sharps use the vowel 'i'** and **flats use the vowel 'u'**.
> Created by **Paisan Chamnong (JiewJumnong)**, 2025.

[![npm version](https://img.shields.io/npm/v/ju-solfege.svg)](https://www.npmjs.com/package/ju-solfege)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-30%20passed-brightgreen.svg)](test.js)

---

## What is Ju Solfège?

**Ju Solfège Chromatic** is a fixed-doh solfège system designed for the full 12-tone chromatic scale.
It extends the standard 7-note diatonic solfège (Do Re Mi Fa Sol La Ti) with a single,
memorable rule for accidentals:

| Direction | Rule | Vowel |
|-----------|------|-------|
| **Sharp ♯** | Replace the main vowel with **i** | Di, Ri, Fi, Si, Li |
| **Flat ♭**  | Replace the main vowel with **u** | Du, Ru, Fu, Su, Lu |

This makes the system easy to remember, phonetically distinct, and suitable for
AI singing voice synthesis (SVS) engines.

---

## The 12-Tone Chromatic Scale

| MIDI | Pitch | Ju ♯ (Sharp) | Ju ♭ (Flat) | American | British |
|------|-------|-------------|------------|----------|---------|
| 0 mod 12 | C  | **Do**  | **Do**  | Do  | Doh |
| 1 mod 12 | C# | **Di**  | —       | Di  | Di  |
| 1 mod 12 | Db | —       | **Du**  | Ra  | Ra  |
| 2 mod 12 | D  | **Re**  | **Re**  | Re  | Ray |
| 3 mod 12 | D# | **Ri**  | —       | Ri  | Ri  |
| 3 mod 12 | Eb | —       | **Ru**  | Me  | Me  |
| 4 mod 12 | E  | **Mi**  | **Mi**  | Mi  | Me  |
| 5 mod 12 | F  | **Fa**  | **Fa**  | Fa  | Fah |
| 6 mod 12 | F# | **Fi**  | —       | Fi  | Fi  |
| 6 mod 12 | Gb | —       | **Fu**  | Se  | Se  |
| 7 mod 12 | G  | **Sol** | **Sol** | Sol | Soh |
| 8 mod 12 | G# | **Si**  | —       | Si  | Si  |
| 8 mod 12 | Ab | —       | **Su**  | Le  | Le  |
| 9 mod 12 | A  | **La**  | **La**  | La  | Lah |
| 10 mod 12 | A# | **Li** | —       | Li  | Li  |
| 10 mod 12 | Bb | —      | **Lu**  | Te  | Te  |
| 11 mod 12 | B  | **Ti** | **Ti**  | Ti  | Si  |

---

## Why Ju Solfège?

1. **One rule**: `sharp → i`, `flat → u` — no memorization needed for each accidental
2. **Phonetically distinct**: Every chromatic note sounds unique when sung
3. **SVS-optimized**: Designed for use in AI Singing Voice Synthesis (Singeria SVS Engine)
4. **Language-neutral**: Works in any language as syllables are universal
5. **Beginner-friendly**: Learners can derive any chromatic name from the diatonic base

---

## Installation

```bash
npm install ju-solfege
```

Or use via CDN (browser):

```html
<script src="https://cdn.jsdelivr.net/npm/ju-solfege/index.js"></script>
```

---

## Usage

### Node.js / CommonJS

```javascript
const { juSolfege, toSolfege, labelMelody, chromaticScale } = require('ju-solfege');

// MIDI → Ju Solfège
juSolfege(61);              // "Di"   (C#4, sharp variant)
juSolfege(61, 'flat');      // "Du"   (Db4, flat variant)
juSolfege(61, 'sharp', true); // "Di4"  (with octave)

// Multi-system conversion
toSolfege(63, 'ju_sharp');  // "Ri"
toSolfege(63, 'ju_flat');   // "Ru"
toSolfege(63, 'american');  // "Ri"
toSolfege(63, 'british');   // "Ri"
toSolfege(60, 'thai');      // "โด"

// Label a melody
labelMelody([60, 62, 64, 65, 67, 69, 71, 72]);
// => ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti', 'Do']

// Full chromatic scale from C4
chromaticScale(60, 'sharp');
// => [
//   { midi: 60, syllable: 'Do',  pitch: 'C4'  },
//   { midi: 61, syllable: 'Di',  pitch: 'C#4' },
//   { midi: 62, syllable: 'Re',  pitch: 'D4'  },
//   ...
// ]
```

### Browser

```html
<script src="ju-solfege/index.js"></script>
<script>
  const { juSolfege, toSolfege } = window.JuSolfege;
  console.log(juSolfege(61));           // "Di"
  console.log(toSolfege(66, 'ju_flat')); // "Fu"
</script>
```

---

## API Reference

### `juSolfege(midi, variant?, octave?)`
Convert a MIDI note number to Ju Solfège.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `midi` | `number` | — | MIDI note number (0–127) |
| `variant` | `'sharp'\|'flat'` | `'sharp'` | Sharp or flat variant |
| `octave` | `boolean` | `false` | Append octave number |

### `toSolfege(midi, system?, octave?)`
Convert MIDI to any solfège system.

| System value | Description |
|---|---|
| `'ju_sharp'` | Ju Solfège — sharp variant |
| `'ju_flat'` | Ju Solfège — flat variant |
| `'american'` | American Fixed-doh Chromatic |
| `'british'` | British Tonic Sol-fa |
| `'thai'` | Thai Solfège |
| `'western'` | Western Do Re Mi |
| `'num'` | Jianpu / Numeric |
| `'pitch'` | Western pitch name (C4, D#5…) |

### `labelMelody(midiArray, variant?, octave?)`
Convert an array of MIDI numbers to syllables.

### `chromaticScale(rootMidi?, variant?)`
Generate full 12-note chromatic scale from a root.

### `fromNoteName(noteName, variant?)`
Convert a note name string (`"C#4"`, `"Bb3"`) to Ju Solfège.

---

## Comparison with Other Systems

| Note | Ju ♯ | Ju ♭ | American | British | Italian |
|------|------|------|----------|---------|---------|
| C  | Do  | Do  | Do  | Doh | Do  |
| C# | **Di** | —   | Di  | Di  | Di  |
| Db | —   | **Du** | Ra  | Ra  | Ra  |
| D  | Re  | Re  | Re  | Ray | Re  |
| D# | **Ri** | —   | Ri  | Ri  | Ri  |
| Eb | —   | **Ru** | Me  | Me  | Me  |
| E  | Mi  | Mi  | Mi  | Me  | Mi  |
| F  | Fa  | Fa  | Fa  | Fah | Fa  |
| F# | **Fi** | —   | Fi  | Fi  | Fi  |
| Gb | —   | **Fu** | Se  | Se  | Se  |
| G  | Sol | Sol | Sol | Soh | Sol |
| G# | **Si** | —   | Si  | Si  | Si  |
| Ab | —   | **Su** | Le  | Le  | Le  |
| A  | La  | La  | La  | Lah | La  |
| A# | **Li** | —   | Li  | Li  | Li  |
| Bb | —   | **Lu** | Te  | Te  | Te  |
| B  | Ti  | Ti  | Ti  | Si  | Ti  |

---

## Applications

- **AI Singing Voice Synthesis (SVS)** — Used in [Singeria SVS Engine](https://github.com/JiewJumnong/singeria)
- **Music Education** — Chromatic solfège for students
- **MIDI Tools** — Automatic lyric generation from MIDI files
- **Music Notation Software** — Label notes with solfège

---

## Integration with Singeria

This library is built into [Singeria SVS](https://github.com/JiewJumnong/singeria):

```javascript
// In Singeria Piano Roll — label all notes with Ju Solfège
singeriaRunCmd('labelSolfege', { mode: 'ju_sharp' });
singeriaRunCmd('labelSolfege', { mode: 'ju_flat' });
```

---

## Author & Copyright

**Inventor**: Paisan Chamnong (JiewJumnong)
**Year**: 2025
**Copyright**: © 2025 Paisan Chamnong (JiewJumnong)
**License**: MIT

> The Ju Solfège Chromatic system — specifically its rule of using vowel 'i' for sharps and 'u' for flats as applied to fixed-doh chromatic solfège — is an original intellectual contribution by Paisan Chamnong.

---

## Contributing

Contributions, translations, and applications of Ju Solfège are welcome.
Please open an issue or pull request on GitHub.

## License

MIT — see [LICENSE](LICENSE)
