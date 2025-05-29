// UNISON Mono Synthesizer Presets
// 16 classic analog synthesizer presets

const monoPresets = [
    {
        "name": "JP Brass",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 12,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.01,
            "decay": 0.3,
            "sustain": 0.8,
            "release": 0.5
        },
        "filter": {
            "Q": 3.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.01,
            "decay": 0.2,
            "sustain": 0.7,
            "release": 0.3,
            "baseFrequency": 1000,
            "octaves": 2.0
        },
    },
    {
        "name": "JP Strings",
        "oscillator": {
            "type": "fatsawtooth",
            "count": 3,
            "spread": 15,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.7,
            "decay": 0.4,
            "sustain": 0.8,
            "release": 1.3
        },
        "filter": {
            "Q": 1.0,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.6,
            "decay": 0.8,
            "sustain": 0.7,
            "release": 1.0,
            "baseFrequency": 1800,
            "octaves": 1.2
        },
    },
    {
        "name": "JP PWM Pad",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 10,
            "width": 0.2
        },
        "envelope": {
            "attack": 0.5,
            "decay": 1.0,
            "sustain": 0.8,
            "release": 1.5
        },
        "filter": {
            "Q": 0.8,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.3,
            "decay": 1.0,
            "sustain": 0.7,
            "release": 1.2,
            "baseFrequency": 1000,
            "octaves": 2.0
        },
    },
    {
        "name": "Juno Strings",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.7,
            "decay": 0.5,
            "sustain": 0.8,
            "release": 1.0
        },
        "filter": {
            "Q": 1.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.5,
            "decay": 0.7,
            "sustain": 0.6,
            "release": 0.8,
            "baseFrequency": 1500,
            "octaves": 1.0
        },
    },
    {
        "name": "Juno Bass",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 5,
            "width": 0.4
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.3,
            "sustain": 0.5,
            "release": 0.2
        },
        "filter": {
            "Q": 5.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.2,
            "release": 0.2,
            "baseFrequency": 100,
            "octaves": 3.5
        },
    },
    {
        "name": "Juno PWM Pad",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 15,
            "width": 0.25
        },
        "envelope": {
            "attack": 0.3,
            "decay": 0.8,
            "sustain": 0.7,
            "release": 1.0
        },
        "filter": {
            "Q": 1.2,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.2,
            "decay": 0.5,
            "sustain": 0.5,
            "release": 0.8,
            "baseFrequency": 800,
            "octaves": 2.0
        },
    },
    {
        "name": "P5 Brass",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 12,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.05,
            "decay": 0.4,
            "sustain": 0.9,
            "release": 0.5
        },
        "filter": {
            "Q": 2.5,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.01,
            "decay": 0.3,
            "sustain": 0.8,
            "release": 0.5,
            "baseFrequency": 1000,
            "octaves": 2.0
        },
    },
    {
        "name": "P5 Strings",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 18,
            "width": 0.4
        },
        "envelope": {
            "attack": 0.5,
            "decay": 0.7,
            "sustain": 0.9,
            "release": 1.5
        },
        "filter": {
            "Q": 1.5,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.3,
            "decay": 0.6,
            "sustain": 0.8,
            "release": 1.2,
            "baseFrequency": 1500,
            "octaves": 1.0
        },
    },
    {
        "name": "P5 Sync Lead",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.4,
            "release": 0.4
        },
        "filter": {
            "Q": 8.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.25,
            "sustain": 0.0,
            "release": 0.3,
            "baseFrequency": 800,
            "octaves": 3.0
        },
    },
    {
        "name": "OB Brass",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 20,
            "width": 0.4
        },
        "envelope": {
            "attack": 0.01,
            "decay": 0.3,
            "sustain": 0.8,
            "release": 0.4
        },
        "filter": {
            "Q": 3.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.6,
            "release": 0.3,
            "baseFrequency": 1200,
            "octaves": 2.0
        },
    },
    {
        "name": "OB Pad",
        "oscillator": {
            "type": "fatsawtooth",
            "count": 3,
            "spread": 15,
            "width": 0.5
        },
        "envelope": {
            "attack": 1.0,
            "decay": 0.5,
            "sustain": 0.9,
            "release": 2.0
        },
        "filter": {
            "Q": 0.8,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.5,
            "decay": 1.0,
            "sustain": 0.8,
            "release": 1.5,
            "baseFrequency": 1000,
            "octaves": 0.8
        },
    },
    {
        "name": "OB Strings",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 15,
            "width": 0.3
        },
        "envelope": {
            "attack": 0.6,
            "decay": 0.8,
            "sustain": 0.8,
            "release": 1.5
        },
        "filter": {
            "Q": 1.0,
            "type": "lowpass",
            "rolloff": -12
        },
        "filterEnvelope": {
            "attack": 0.3,
            "decay": 0.7,
            "sustain": 0.7,
            "release": 1.0,
            "baseFrequency": 1800,
            "octaves": 1.0
        },
    },
    {
        "name": "Mini Bass",
        "oscillator": {
            "type": "triangle",
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
            "Q": 3.5,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.4,
            "sustain": 0.3,
            "release": 0.2,
            "baseFrequency": 300,
            "octaves": 2.5
        },
    },
    {
        "name": "Mini Lead",
        "oscillator": {
            "type": "sawtooth",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.6,
            "release": 0.4
        },
        "filter": {
            "Q": 4.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.3,
            "sustain": 0.5,
            "release": 0.4,
            "baseFrequency": 800,
            "octaves": 2.0
        },
    },
    {
        "name": "Mini Fifth",
        "oscillator": {
            "type": "pulse",
            "count": 3,
            "spread": 20,
            "width": 0.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.3,
            "sustain": 0.4,
            "release": 0.3
        },
        "filter": {
            "Q": 5.0,
            "type": "lowpass",
            "rolloff": -24
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.2,
            "release": 0.3,
            "baseFrequency": 700,
            "octaves": 3.0
        },
    },
    {
        "name": "Mini Pluck",
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
            "decay": 0.1,
            "sustain": 0.0,
            "release": 0.12,
            "baseFrequency": 1500,
            "octaves": 2.5
        },
    }
];
window.monoPresets = monoPresets;