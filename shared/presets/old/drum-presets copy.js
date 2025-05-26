// UNISON Drum Synthesizer Presets
// Membrane + Noise synthesis architecture

const drumPresets = {
    "instrument": "UNISON DRUM",
    "presets": [
        {
            "name": "Classic Kick",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.1,
                    "octaves": 4,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.4,
                        "sustain": 0.01,
                        "release": 0.4
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.2,
                        "sustain": 0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.3
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 200,
                    "Q": 1,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.2,
                    "sustain": 0.5,
                    "release": 0.5,
                    "baseFrequency": 200,
                    "octaves": 2
                },
                "compressor": {
                    "threshold": -12,
                    "ratio": 4,
                    "attack": 0.003,
                    "release": 0.1,
                    "knee": 6
                },
                "pitch": "C2"
            }
        },
        {
            "name": "808 Sub",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": false,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.15,
                    "octaves": 6,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.8,
                        "sustain": 0.0,
                        "release": 0.6
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.1,
                        "sustain": 0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 0.1
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 150,
                    "Q": 0.5,
                    "rolloff": -24
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.3,
                    "sustain": 0.3,
                    "release": 0.8,
                    "baseFrequency": 150,
                    "octaves": 1.5
                },
                "compressor": {
                    "threshold": -8,
                    "ratio": 6,
                    "attack": 0.001,
                    "release": 0.15,
                    "knee": 4
                },
                "pitch": "C1"
            }
        },
        {
            "name": "Snare Hit",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.05,
                    "octaves": 3,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.15,
                        "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1.5
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.12,
                        "sustain": 0,
                        "release": 0.15
                    }
                },
                "mix": {
                    "crossfade": 0.7
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 2000,
                    "Q": 2,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.2,
                    "release": 0.3,
                    "baseFrequency": 1500,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 8,
                    "attack": 0.001,
                    "release": 0.08,
                    "knee": 8
                },
                "pitch": "D2"
            }
        },
        {
            "name": "Hi Hat",
            "patch": {
                "power": {
                    "membrane": false,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.02,
                    "octaves": 2,
                    "oscillator": {
                        "type": "square"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.05,
                        "sustain": 0.0,
                        "release": 0.05
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 2
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.04,
                        "sustain": 0,
                        "release": 0.03
                    }
                },
                "mix": {
                    "crossfade": 0.9
                },
                "filter": {
                    "type": "highpass",
                    "frequency": 8000,
                    "Q": 1.5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.02,
                    "sustain": 0.8,
                    "release": 0.05,
                    "baseFrequency": 6000,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -15,
                    "ratio": 10,
                    "attack": 0.001,
                    "release": 0.02,
                    "knee": 2
                },
                "pitch": "F#2"
            }
        },
        {
            "name": "Tom Low",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.08,
                    "octaves": 5,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.3,
                        "sustain": 0.05,
                        "release": 0.4
                    }
                },
                "noise": {
                    "noise": {
                        "type": "pink",
                        "playbackRate": 0.8
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.15,
                        "sustain": 0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.4
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 800,
                    "Q": 1.2,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.005,
                    "decay": 0.15,
                    "sustain": 0.4,
                    "release": 0.6,
                    "baseFrequency": 600,
                    "octaves": 1.5
                },
                "compressor": {
                    "threshold": -14,
                    "ratio": 5,
                    "attack": 0.002,
                    "release": 0.12,
                    "knee": 5
                },
                "pitch": "A1"
            }
        },
        {
            "name": "Clap",
            "patch": {
                "power": {
                    "membrane": false,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.03,
                    "octaves": 2,
                    "oscillator": {
                        "type": "square"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.08,
                        "sustain": 0.0,
                        "release": 0.1
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1.2
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.1,
                        "sustain": 0,
                        "release": 0.15
                    }
                },
                "mix": {
                    "crossfade": 0.85
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1500,
                    "Q": 3,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.08,
                    "sustain": 0.3,
                    "release": 0.2,
                    "baseFrequency": 1200,
                    "octaves": 0.8
                },
                "compressor": {
                    "threshold": -12,
                    "ratio": 12,
                    "attack": 0.001,
                    "release": 0.05,
                    "knee": 10
                },
                "pitch": "E2"
            }
        },
        {
            "name": "Crash",
            "patch": {
                "power": {
                    "membrane": false,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.2,
                    "octaves": 3,
                    "oscillator": {
                        "type": "sawtooth"
                    },
                    "envelope": {
                        "attack": 0.01,
                        "decay": 1.0,
                        "sustain": 0.2,
                        "release": 1.5
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 3
                    },
                    "envelope": {
                        "attack": 0.01,
                        "decay": 0.8,
                        "sustain": 0.1,
                        "release": 1.2
                    }
                },
                "mix": {
                    "crossfade": 0.8
                },
                "filter": {
                    "type": "highpass",
                    "frequency": 3000,
                    "Q": 0.8,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.02,
                    "decay": 0.5,
                    "sustain": 0.6,
                    "release": 1.0,
                    "baseFrequency": 2500,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -18,
                    "ratio": 3,
                    "attack": 0.01,
                    "release": 0.3,
                    "knee": 4
                },
                "pitch": "C3"
            }
        },
        {
            "name": "Ride",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.12,
                    "octaves": 4,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                        "attack": 0.005,
                        "decay": 0.6,
                        "sustain": 0.15,
                        "release": 0.8
                    }
                },
                "noise": {
                    "noise": {
                        "type": "pink",
                        "playbackRate": 2.5
                    },
                    "envelope": {
                        "attack": 0.005,
                        "decay": 0.4,
                        "sustain": 0.1,
                        "release": 0.6
                    }
                },
                "mix": {
                    "crossfade": 0.6
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 5000,
                    "Q": 1.5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.3,
                    "sustain": 0.5,
                    "release": 0.7,
                    "baseFrequency": 4000,
                    "octaves": 1.2
                },
                "compressor": {
                    "threshold": -16,
                    "ratio": 4,
                    "attack": 0.005,
                    "release": 0.2,
                    "knee": 6
                },
                "pitch": "F2"
            }
        },
        {
            "name": "Perc Hit",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.06,
                    "octaves": 3.5,
                    "oscillator": {
                        "type": "square"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.12,
                        "sustain": 0.0,
                        "release": 0.15
                    }
                },
                "noise": {
                    "noise": {
                        "type": "brown",
                        "playbackRate": 1.8
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.08,
                        "sustain": 0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 0.55
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1200,
                    "Q": 2.5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.002,
                    "decay": 0.06,
                    "sustain": 0.25,
                    "release": 0.12,
                    "baseFrequency": 1000,
                    "octaves": 1.5
                },
                "compressor": {
                    "threshold": -13,
                    "ratio": 6,
                    "attack": 0.001,
                    "release": 0.08,
                    "knee": 7
                },
                "pitch": "G2"
            }
        },
        {
            "name": "Sub Boom",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": false,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.25,
                    "octaves": 7,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 1.2,
                        "sustain": 0.0,
                        "release": 0.8
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.1,
                        "sustain": 0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 0.2
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 100,
                    "Q": 0.7,
                    "rolloff": -24
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.4,
                    "sustain": 0.2,
                    "release": 1.0,
                    "baseFrequency": 80,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -6,
                    "ratio": 8,
                    "attack": 0.001,
                    "release": 0.2,
                    "knee": 3
                },
                "pitch": "C1"
            }
        },
        {
            "name": "Noise Burst",
            "patch": {
                "power": {
                    "membrane": false,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.05,
                    "octaves": 2,
                    "oscillator": {
                        "type": "sawtooth"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.05,
                        "sustain": 0.0,
                        "release": 0.05
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 4
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.03,
                        "sustain": 0,
                        "release": 0.02
                    }
                },
                "mix": {
                    "crossfade": 0.95
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 6000,
                    "Q": 4,
                    "rolloff": -24
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.02,
                    "sustain": 0.1,
                    "release": 0.03,
                    "baseFrequency": 5000,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -20,
                    "ratio": 15,
                    "attack": 0.001,
                    "release": 0.01,
                    "knee": 1
                },
                "pitch": "A2"
            }
        },
        {
            "name": "Deep Thump",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.18,
                    "octaves": 6,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.6,
                        "sustain": 0.02,
                        "release": 0.5
                    }
                },
                "noise": {
                    "noise": {
                        "type": "brown",
                        "playbackRate": 0.5
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.3,
                        "sustain": 0,
                        "release": 0.25
                    }
                },
                "mix": {
                    "crossfade": 0.25
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 250,
                    "Q": 1.5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.01,
                    "decay": 0.25,
                    "sustain": 0.3,
                    "release": 0.7,
                    "baseFrequency": 200,
                    "octaves": 1.8
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 6,
                    "attack": 0.002,
                    "release": 0.15,
                    "knee": 8
                },
                "pitch": "F1"
            }
        },
        {
            "name": "Metallic Hit",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.04,
                    "octaves": 2.5,
                    "oscillator": {
                        "type": "square"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.2,
                        "sustain": 0.05,
                        "release": 0.3
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 3.5
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.15,
                        "sustain": 0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.65
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 3500,
                    "Q": 5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.4,
                    "release": 0.25,
                    "baseFrequency": 3000,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -14,
                    "ratio": 10,
                    "attack": 0.001,
                    "release": 0.06,
                    "knee": 12
                },
                "pitch": "D#2"
            }
        },
        {
            "name": "Ambient Perc",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": false
                },
                "membrane": {
                    "pitchDecay": 0.3,
                    "octaves": 4.5,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                        "attack": 0.05,
                        "decay": 1.5,
                        "sustain": 0.3,
                        "release": 2.0
                    }
                },
                "noise": {
                    "noise": {
                        "type": "pink",
                        "playbackRate": 1.5
                    },
                    "envelope": {
                        "attack": 0.1,
                        "decay": 1.0,
                        "sustain": 0.2,
                        "release": 1.5
                    }
                },
                "mix": {
                    "crossfade": 0.5
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 2000,
                    "Q": 0.5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.1,
                    "decay": 0.8,
                    "sustain": 0.6,
                    "release": 1.2,
                    "baseFrequency": 1500,
                    "octaves": 2
                },
                "compressor": {
                    "threshold": -20,
                    "ratio": 2,
                    "attack": 0.01,
                    "release": 0.5,
                    "knee": 2
                },
                "pitch": "B1"
            }
        },
        {
            "name": "Glitch Perc",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.02,
                    "octaves": 1.5,
                    "oscillator": {
                        "type": "sawtooth"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.08,
                        "sustain": 0.0,
                        "release": 0.05
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 8
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.04,
                        "sustain": 0,
                        "release": 0.02
                    }
                },
                "mix": {
                    "crossfade": 0.75
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 8000,
                    "Q": 8,
                    "rolloff": -24
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.03,
                    "sustain": 0.05,
                    "release": 0.04,
                    "baseFrequency": 7000,
                    "octaves": 0.3
                },
                "compressor": {
                    "threshold": -25,
                    "ratio": 20,
                    "attack": 0.001,
                    "release": 0.005,
                    "knee": 0
                },
                "pitch": "C#3"
            }
        }
    ]
};

// Make available globally for patch manager
window.drumPresets = drumPresets.presets; 