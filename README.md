# UNISON

A collection of web-based synthesizers and drum machines built with Tone.js.

## Overview

UNISON is a suite of browser-based musical instruments featuring:

- **MONO** - Monophonic analog-style synthesizer
- **FM** - FM synthesis engine  
- **DRUM** - Drum machine and percussion sequencer

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
- Multiple drum sounds and percussion
- Pattern sequencing
- Real-time performance controls

## Getting Started

1. Clone this repository
2. Open any of the `index.html` files in a modern web browser:
   - `mono/index.html` - Monophonic synthesizer
   - `fm/index.html` - FM synthesizer
   - `drum/index.html` - Drum machine

No build process or server required - just open and play!

## Controls

### Keyboard Controls (MONO)
- **A-J keys** map to piano keys (C-B)
- **W, E, T, Y, U** for black keys (sharps/flats)
- Use the octave control to change pitch range

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
- `/mono`, `/fm`, `/drum` - Individual instrument modules
- Each module is self-contained with its own HTML entry point

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source. Feel free to use and modify for your own projects.

---

**Made with ♪ by Jeff Davis** 