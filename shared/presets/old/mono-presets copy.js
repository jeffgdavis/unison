// UNISON Mono Synthesizer Presets
// 16 classic analog synthesizer presets

const monoPresets = [
    {
        "name": "Moog Bass Classic",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.3,
            "sustain": 0.7,
            "release": 0.2
        },
        "filter": {
            "Q": 4.5,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.4,
            "sustain": 0.3,
            "release": 0.2,
            "baseFrequency": 400,
            "octaves": 2.5
        },
        "portamento": 0.1,
        "voiceMode": "mono"
    },
    {
        "name": "TB-303 Acid Bass",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.1,
            "sustain": 0.0,
            "release": 0.1
        },
        "filter": {
            "Q": 8.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.15,
            "sustain": 0.1,
            "release": 0.1,
            "baseFrequency": 800,
            "octaves": 3.0
        },
        "portamento": 0.05,
        "voiceMode": "mono"
    },
    {
        "name": "Prophet Lead",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 20,
            "width": 0.3
        },
        "envelope": {
            "attack": 0.02,
            "decay": 0.5,
            "sustain": 0.6,
            "release": 0.8
        },
        "filter": {
            "Q": 2.5,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.05,
            "decay": 0.3,
            "sustain": 0.4,
            "release": 0.6,
            "baseFrequency": 1200,
            "octaves": 1.8
        },
        "portamento": 0.15,
        "voiceMode": "mono"
    },
    {
        "name": "Jupiter Strings",
        "oscillator": {
            "type": "fatsawtooth",
            "count": 3,
            "spread": 15,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.8,
            "decay": 0.4,
            "sustain": 0.8,
            "release": 1.2
        },
        "filter": {
            "Q": 1.2,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.6,
            "decay": 0.8,
            "sustain": 0.7,
            "release": 1.0,
            "baseFrequency": 2000,
            "octaves": 1.0
        },
        "portamento": 0.0,
        "voiceMode": "poly"
    },
    {
        "name": "Oberheim Brass",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 20,
            "width": 0.4
        },
        "envelope": {
            "attack": 0.05,
            "decay": 0.2,
            "sustain": 0.9,
            "release": 0.4
        },
        "filter": {
            "Q": 3.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.6,
            "release": 0.3,
            "baseFrequency": 1800,
            "octaves": 1.5
        },
        "portamento": 0.0,
        "voiceMode": "poly"
    },
    {
        "name": "ARP Odyssey Lead",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.15,
            "sustain": 0.4,
            "release": 0.3
        },
        "filter": {
            "Q": 6.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.2,
            "release": 0.25,
            "baseFrequency": 1500,
            "octaves": 2.8
        },
        "portamento": 0.08,
        "voiceMode": "mono"
    },
    {
        "name": "CS-80 Vangelis Pad",
        "oscillator": {
            "type": "fatsawtooth",
            "count": 4,
            "spread": 12,
            "width": 0.5
        },
        "envelope": {
            "attack": 1.2,
            "decay": 0.8,
            "sustain": 0.9,
            "release": 2.5
        },
        "filter": {
            "Q": 0.8,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 1.0,
            "decay": 1.2,
            "sustain": 0.8,
            "release": 2.0,
            "baseFrequency": 3000,
            "octaves": 0.8
        },
        "portamento": 0.0,
        "voiceMode": "poly"
    },
    {
        "name": "Minimoog Bass",
        "oscillator": {
            "type": "triangle",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.4,
            "sustain": 0.8,
            "release": 0.3
        },
        "filter": {
            "Q": 3.5,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.5,
            "sustain": 0.4,
            "release": 0.3,
            "baseFrequency": 300,
            "octaves": 2.0
        },
        "portamento": 0.12,
        "voiceMode": "mono"
    },
    {
        "name": "SH-101 Bass",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 20,
            "width": 0.2
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.25,
            "sustain": 0.6,
            "release": 0.2
        },
        "filter": {
            "Q": 5.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.3,
            "sustain": 0.3,
            "release": 0.2,
            "baseFrequency": 600,
            "octaves": 2.5
        },
        "portamento": 0.06,
        "voiceMode": "mono"
    },
    {
        "name": "Analog Pluck",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.12,
            "sustain": 0.0,
            "release": 0.15
        },
        "filter": {
            "Q": 7.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.15,
            "sustain": 0.0,
            "release": 0.12,
            "baseFrequency": 2000,
            "octaves": 2.0
        },
        "portamento": 0.0,
        "voiceMode": "mono"
    },
    {
        "name": "Sync Lead",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.25,
            "sustain": 0.6,
            "release": 0.4
        },
        "filter": {
            "Q": 8.5,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.3,
            "sustain": 0.4,
            "release": 0.35,
            "baseFrequency": 1200,
            "octaves": 2.8
        },
        "portamento": 0.05,
        "voiceMode": "mono"
    },
    {
        "name": "Warehouse Stab",
        "oscillator": {
            "type": "fatsawtooth",
            "count": 3,
            "spread": 18,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.3,
            "release": 0.4
        },
        "filter": {
            "Q": 2.8,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.25,
            "sustain": 0.1,
            "release": 0.3,
            "baseFrequency": 1800,
            "octaves": 2.2
        },
        "portamento": 0.0,
        "voiceMode": "poly"
    },
    {
        "name": "Ambient Texture",
        "oscillator": {
            "type": "sine",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 2.0,
            "decay": 1.0,
            "sustain": 0.9,
            "release": 2.0
        },
        "filter": {
            "Q": 0.5,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 1.8,
            "decay": 1.5,
            "sustain": 0.8,
            "release": 2.0,
            "baseFrequency": 5000,
            "octaves": 0.5
        },
        "portamento": 0.0,
        "voiceMode": "poly"
    },
    {
        "name": "Techno Pluck",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.15,
            "sustain": 0.0,
            "release": 0.2
        },
        "filter": {
            "Q": 6.5,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.18,
            "sustain": 0.0,
            "release": 0.15,
            "baseFrequency": 2200,
            "octaves": 2.5
        },
        "portamento": 0.0,
        "voiceMode": "mono"
    },
    {
        "name": "Vintage Organ",
        "oscillator": {
            "type": "sine",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 1.0,
            "release": 0.1
        },
        "filter": {
            "Q": 1.0,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.8,
            "release": 0.1,
            "baseFrequency": 6000,
            "octaves": 0.3
        },
        "portamento": 0.0,
        "voiceMode": "poly"
    },
    {
        "name": "New Wave Arp",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 20,
            "width": 0.35
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.1,
            "sustain": 0.2,
            "release": 0.15
        },
        "filter": {
            "Q": 4.2,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.12,
            "sustain": 0.15,
            "release": 0.1,
            "baseFrequency": 1500,
            "octaves": 1.8
        },
        "portamento": 0.0,
        "voiceMode": "mono"
    }
];

// Expose as global variable for UnisonPatchManagerLocal
window.monoPresets = monoPresets; 