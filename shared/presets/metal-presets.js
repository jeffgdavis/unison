/**
 * ============================================================================
 * UNISON METAL SYNTHESIZER PRESETS
 * ============================================================================
 * 
 * Preset collection for the METAL synthesizer featuring various metallic sounds
 * including bells, gongs, percussion, and other metallic timbres.
 * 
 * Each preset showcases different aspects of the MetalSynth engine:
 * - Harmonicity: Controls the harmonic relationship between oscillators
 * - Modulation Index: Controls brightness and harshness
 * - Resonance: High values (>0.9) create metallic ringing
 * - Octaves: Controls FM modulation range
 * - Envelope: Shapes the metallic attack and decay
 * ============================================================================
 */

const METAL_PRESETS = [
    {
        "name": "Church Bell",
        "harmonics": {
            "harmonicity": 12.5,
            "modulationIndex": 25.0,
            "resonance": 0.85,
            "octaves": 2.0
        },
        "envelope": {
            "attack": 0.001,
            "decay": 3.5,
            "sustain": 0.1,
            "release": 4.0
        }
    },
    {
        "name": "Tibetan Bowl",
        "harmonics": {
            "harmonicity": 8.2,
            "modulationIndex": 18.5,
            "resonance": 0.75,
            "octaves": 1.8
        },
        "envelope": {
            "attack": 0.005,
            "decay": 2.8,
            "sustain": 0.2,
            "release": 3.5
        }
    },
    {
        "name": "Gong Strike",
        "harmonics": {
            "harmonicity": 6.7,
            "modulationIndex": 45.0,
            "resonance": 0.45,
            "octaves": 3.2
        },
        "envelope": {
            "attack": 0.001,
            "decay": 4.0,
            "sustain": 0.05,
            "release": 5.0
        }
    },
    {
        "name": "Wind Chimes",
        "harmonics": {
            "harmonicity": 15.8,
            "modulationIndex": 12.0,
            "resonance": 0.90,
            "octaves": 1.2
        },
        "envelope": {
            "attack": 0.002,
            "decay": 1.8,
            "sustain": 0.15,
            "release": 2.5
        }
    },
    {
        "name": "Anvil Hit",
        "harmonics": {
            "harmonicity": 22.0,
            "modulationIndex": 65.0,
            "resonance": 0.35,
            "octaves": 2.5
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.8,
            "sustain": 0.0,
            "release": 1.2
        }
    },
    {
        "name": "Gamelan",
        "harmonics": {
            "harmonicity": 9.4,
            "modulationIndex": 28.0,
            "resonance": 0.80,
            "octaves": 1.6
        },
        "envelope": {
            "attack": 0.003,
            "decay": 2.2,
            "sustain": 0.12,
            "release": 3.0
        }
    },
    {
        "name": "Cymbal Crash",
        "harmonics": {
            "harmonicity": 35.0,
            "modulationIndex": 80.0,
            "resonance": 0.25,
            "octaves": 4.0
        },
        "envelope": {
            "attack": 0.001,
            "decay": 1.5,
            "sustain": 0.0,
            "release": 2.0
        }
    },
    {
        "name": "Temple Bell",
        "harmonics": {
            "harmonicity": 11.3,
            "modulationIndex": 20.0,
            "resonance": 0.95,
            "octaves": 1.4
        },
        "envelope": {
            "attack": 0.002,
            "decay": 4.5,
            "sustain": 0.08,
            "release": 4.8
        }
    },
    {
        "name": "Metal Pipe",
        "harmonics": {
            "harmonicity": 16.7,
            "modulationIndex": 15.0,
            "resonance": 0.70,
            "octaves": 1.0
        },
        "envelope": {
            "attack": 0.001,
            "decay": 2.0,
            "sustain": 0.25,
            "release": 2.5
        }
    },
    {
        "name": "Hammer Strike",
        "harmonics": {
            "harmonicity": 28.5,
            "modulationIndex": 55.0,
            "resonance": 0.40,
            "octaves": 2.8
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.6,
            "sustain": 0.0,
            "release": 0.9
        }
    },
    {
        "name": "Singing Bowl",
        "harmonics": {
            "harmonicity": 7.8,
            "modulationIndex": 22.0,
            "resonance": 0.98,
            "octaves": 1.5
        },
        "envelope": {
            "attack": 0.008,
            "decay": 3.8,
            "sustain": 0.18,
            "release": 4.2
        }
    },
    {
        "name": "Triangle",
        "harmonics": {
            "harmonicity": 19.2,
            "modulationIndex": 8.0,
            "resonance": 0.99,
            "octaves": 0.8
        },
        "envelope": {
            "attack": 0.001,
            "decay": 2.5,
            "sustain": 0.3,
            "release": 3.2
        }
    },
    {
        "name": "Steel Drum",
        "harmonics": {
            "harmonicity": 13.6,
            "modulationIndex": 35.0,
            "resonance": 0.65,
            "octaves": 2.2
        },
        "envelope": {
            "attack": 0.002,
            "decay": 1.2,
            "sustain": 0.05,
            "release": 1.8
        }
    },
    {
        "name": "Vibraphone",
        "harmonics": {
            "harmonicity": 14.8,
            "modulationIndex": 16.0,
            "resonance": 0.85,
            "octaves": 1.3
        },
        "envelope": {
            "attack": 0.003,
            "decay": 2.8,
            "sustain": 0.22,
            "release": 3.5
        }
    },
    {
        "name": "Metallic Pluck",
        "harmonics": {
            "harmonicity": 25.3,
            "modulationIndex": 42.0,
            "resonance": 0.55,
            "octaves": 1.9
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.4,
            "sustain": 0.0,
            "release": 0.6
        }
    },
    {
        "name": "Resonant Strike",
        "harmonics": {
            "harmonicity": 18.7,
            "modulationIndex": 38.0,
            "resonance": 0.88,
            "octaves": 2.4
        },
        "envelope": {
            "attack": 0.001,
            "decay": 1.8,
            "sustain": 0.02,
            "release": 2.2
        }
    }
];

// Export presets to global scope
window.METAL_PRESETS = METAL_PRESETS;

// Log successful loading
console.log('🎸 METAL presets loaded: –', METAL_PRESETS.length, '– "presets"'); 