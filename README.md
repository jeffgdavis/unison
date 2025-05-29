# UNISON

A collection of web-based synthesizers built with Tone.js.

## Overview

UNISON is a suite of browser-based musical instruments featuring:

- **MONO** - Monophonic analog-style synthesizer
- **FM** - FM synthesis engine  
- **DRUM** - Drum and percussion synthesizer
- **STRING** - Plucked string synthesizer with strum engine

## Demo

Try the live instruments:
- Open `mono/index.html` for the analog-style synthesizer
- Open `fm/index.html` for FM synthesis
- Open `drum/index.html` for the drum machine
- Open `string/index.html` for the string synthesizer

## Features

### MONO Synthesizer
- Multiple oscillator waveforms (sine, triangle, pulse, sawtooth, fat sawtooth)
- Pulse width modulation for pulse waves
- Amplitude and filter envelopes (ADSR)
- Low-pass filter with resonance control
- Monophonic and polyphonic modes
- Portamento/glide control
- Built-in preset system

### FM Synthesizer
- FM synthesis capabilities
- Advanced modulation options
- Custom preset management

### Drum Machine
- Combined membrane and noise synthesis
- Filter and compression control
- Multiple drum sounds and percussion
- Real-time performance controls

### STRING Synthesizer
- Karplus-Strong physical modeling synthesis
- Realistic plucked string sounds
- Intelligent strum engine with chord detection
- Multiple strum directions (down, up, alternate)
- 6-voice polyphony (guitar-like)
- String instrument presets (guitar, banjo, harp, sitar, etc.)
- Mono/poly voice modes

## Getting Started

1. Clone this repository
2. Open `index.html` in a modern web browser for the main launcher
3. Or open individual synthesizers directly:
   - `mono/index.html` - Monophonic synthesizer
   - `fm/index.html` - FM synthesizer
   - `drum/index.html` - Drum machine
   - `string/index.html` - String synthesizer

No build process or server required - just open and play!

## Controls

### Keyboard Controls (MONO & STRING)
- **A-J keys** map to piano keys (C-B)
- **W, E, T, Y, U** for black keys (sharps/flats)
- Use the octave control to change pitch range
- **STRING**: Play chords quickly for automatic strum effect

### Mouse Controls
- All parameters can be controlled with sliders and dropdowns
- Real-time parameter changes while playing

## Technology

- **Tone.js** - Web Audio API synthesis and effects
- **Vanilla JavaScript** - No frameworks, pure JS
- **CSS3** - Modern styling and responsive design
- **HTML5** - Semantic markup and audio context

## Browser Compatibility

Works in all modern browsers that support the Web Audio API:
- Chrome 66+
- Firefox 60+
- Safari 14.1+
- Edge 79+

## Development

The project uses a modular structure:
- `/shared` - Common CSS and JavaScript utilities
- `/mono`, `/fm`, `/drum`, `/string` - Individual instrument modules
- Each module is self-contained with its own HTML entry point

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source. Feel free to use and modify for your own projects.

---

**Made with ♪ by Jeff Davis** 
