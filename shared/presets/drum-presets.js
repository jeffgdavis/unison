// UNISON Drum Synthesizer Presets
// Membrane + Noise synthesis architecture

const drumPresets = {
    "instrument": "UNISON DRUM",
    "presets": [
        {
            "name": "TR Kick",
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
                    "sustain": 0.0,
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
            "name": "TR Snare",
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
                    "decay": 0.2,
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
                        "decay": 0.25,
                    "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.6
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1800,
                    "Q": 2,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.1,
                    "release": 0.2,
                    "baseFrequency": 1500,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 8,
                    "attack": 0.001,
                    "release": 0.1,
                    "knee": 8
                },
                "pitch": "D2"
            }
        },
        {
            "name": "TR Clap",
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
                        "decay": 0.15,
                    "sustain": 0.0,
                        "release": 0.1
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
                "pitch": "D#2"
            }
        },
        {
            "name": "TR Open Hat",
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
                        "decay": 0.3,
                    "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.9
                },
                "filter": {
                    "type": "highpass",
                    "frequency": 4000,
                    "Q": 1,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.05,
                    "sustain": 0.5,
                    "release": 0.2,
                    "baseFrequency": 3000,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -12,
                    "ratio": 8,
                    "attack": 0.001,
                    "release": 0.05,
                    "knee": 4
                },
                "pitch": "A#2"
            }
        },
        {
            "name": "TR Cowbell",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.01,
                    "octaves": 2,
                    "oscillator": {
                        "type": "square"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.2,
                        "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.15,
                        "sustain": 0.0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 0.3
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 600,
                    "Q": 2,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.0,
                    "release": 0.1,
                    "baseFrequency": 500,
                    "octaves": 1.5
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 4,
                    "attack": 0.002,
                    "release": 0.1,
                    "knee": 6
                },
                "pitch": "D#5"
            }
        },
        {
            "name": "Linn Kick",
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
                    "decay": 0.3,
                    "sustain": 0.0,
                        "release": 0.3
                    }
                },
                "noise": {
                    "noise": {
                        "type": "pink",
                        "playbackRate": 1
                    },
                    "envelope": {
                    "attack": 0.001,
                        "decay": 0.1,
                    "sustain": 0.0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 0.2
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 400,
                    "Q": 1,
                    "rolloff": -24
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.05,
                    "sustain": 0.0,
                    "release": 0.1,
                    "baseFrequency": 200,
                    "octaves": 4
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
            "name": "Linn Snare",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.02,
                    "octaves": 2,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                    "attack": 0.001,
                    "decay": 0.2,
                    "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "noise": {
                    "noise": {
                        "type": "white",
                        "playbackRate": 1
                    },
                    "envelope": {
                    "attack": 0.001,
                        "decay": 0.3,
                    "sustain": 0.0,
                        "release": 0.3
                    }
                },
                "mix": {
                    "crossfade": 0.5
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1200,
                    "Q": 1,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.0,
                    "release": 0.2,
                    "baseFrequency": 800,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 6,
                    "attack": 0.001,
                    "release": 0.08,
                    "knee": 8
                },
                "pitch": "E2"
            }
        },
        {
            "name": "Linn Clap",
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
                        "decay": 0.1,
                    "sustain": 0.0,
                        "release": 0.1
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
                    "sustain": 0.0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 0.9
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1000,
                    "Q": 1.5,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.05,
                    "sustain": 0.0,
                    "release": 0.1,
                    "baseFrequency": 800,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -8,
                    "ratio": 8,
                    "attack": 0.001,
                    "release": 0.1,
                    "knee": 8
                },
                "pitch": "B1"
            }
        },
        {
            "name": "Linn Tamb",
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
                        "playbackRate": 3
                    },
                    "envelope": {
                    "attack": 0.001,
                        "decay": 0.5,
                    "sustain": 0.0,
                        "release": 0.3
                    }
                },
                "mix": {
                    "crossfade": 1.0
                },
                "filter": {
                    "type": "highpass",
                    "frequency": 4000,
                    "Q": 0.8,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.0,
                    "release": 0.2,
                    "baseFrequency": 3000,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 6,
                    "attack": 0.001,
                    "release": 0.05,
                    "knee": 4
                },
                "pitch": "F#3"
            }
        },
        {
            "name": "DMX Kick",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.07,
                    "octaves": 3,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                    "attack": 0.001,
                    "decay": 0.4,
                    "sustain": 0.0,
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
                        "decay": 0.08,
                    "sustain": 0.0,
                        "release": 0.08
                    }
                },
                "mix": {
                    "crossfade": 0.2
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 150,
                    "Q": 1,
                    "rolloff": -24
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.02,
                    "sustain": 0.0,
                    "release": 0.1,
                    "baseFrequency": 100,
                    "octaves": 5
                },
                "compressor": {
                    "threshold": -8,
                    "ratio": 4,
                    "attack": 0.003,
                    "release": 0.1,
                    "knee": 6
                },
                "pitch": "C#1"
            }
        },
        {
            "name": "DMX Snare",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.03,
                    "octaves": 2,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                    "attack": 0.001,
                        "decay": 0.15,
                    "sustain": 0.0,
                        "release": 0.15
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
                    "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.4
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1800,
                    "Q": 1,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.05,
                    "sustain": 0.0,
                    "release": 0.1,
                    "baseFrequency": 1200,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -8,
                    "ratio": 6,
                    "attack": 0.001,
                    "release": 0.1,
                    "knee": 8
                },
                "pitch": "C2"
            }
        },
        {
            "name": "DMX Clap",
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
                        "decay": 0.08,
                    "sustain": 0.0,
                        "release": 0.08
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
                    "sustain": 0.0,
                        "release": 0.1
                    }
                },
                "mix": {
                    "crossfade": 1.0
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 2000,
                    "Q": 2,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.05,
                    "sustain": 0.0,
                    "release": 0.1,
                    "baseFrequency": 1500,
                    "octaves": 0.5
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 10,
                    "attack": 0.001,
                    "release": 0.05,
                    "knee": 8
                },
                "pitch": "G#1"
            }
        },
        {
            "name": "DMX Hat",
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
                        "decay": 0.02,
                    "sustain": 0.0,
                        "release": 0.02
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
                    "sustain": 0.0,
                        "release": 0.03
                    }
                },
                "mix": {
                    "crossfade": 0.9
                },
                "filter": {
                    "type": "highpass",
                    "frequency": 6000,
                    "Q": 1,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.01,
                    "sustain": 0.5,
                    "release": 0.02,
                    "baseFrequency": 5000,
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
            "name": "SDS Tom High",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.08,
                    "octaves": 3,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 0.3,
                        "sustain": 0.0,
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
                        "decay": 0.1,
                        "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.4
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 1200,
                    "Q": 1.0,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.005,
                    "decay": 0.1,
                    "sustain": 0.0,
                    "release": 0.2,
                    "baseFrequency": 800,
                    "octaves": 1.5
                },
                "compressor": {
                    "threshold": -10,
                    "ratio": 4,
                    "attack": 0.003,
                    "release": 0.1,
                    "knee": 6
                },
                "pitch": "F2"
            }
        },
        {
            "name": "SDS Tom Low",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.12,
                    "octaves": 5,
                    "oscillator": {
                        "type": "sine"
                    },
                    "envelope": {
                    "attack": 0.001,
                        "decay": 0.5,
                    "sustain": 0.0,
                        "release": 0.5
                    }
                },
                "noise": {
                    "noise": {
                        "type": "pink",
                        "playbackRate": 0.5
                    },
                    "envelope": {
                    "attack": 0.001,
                    "decay": 0.2,
                    "sustain": 0.0,
                        "release": 0.3
                    }
                },
                "mix": {
                    "crossfade": 0.4
                },
                "filter": {
                    "type": "lowpass",
                    "frequency": 500,
                    "Q": 1.0,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.005,
                    "decay": 0.2,
                    "sustain": 0.0,
                    "release": 0.3,
                    "baseFrequency": 400,
                    "octaves": 1
                },
                "compressor": {
                    "threshold": -8,
                    "ratio": 4,
                    "attack": 0.003,
                    "release": 0.2,
                    "knee": 6
                },
                "pitch": "A1"
            }
        },
        {
            "name": "SDS Snare",
            "patch": {
                "power": {
                    "membrane": true,
                    "noise": true,
                    "filter": true,
                    "compressor": true
                },
                "membrane": {
                    "pitchDecay": 0.05,
                    "octaves": 4,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                    "attack": 0.001,
                        "decay": 0.2,
                    "sustain": 0.0,
                        "release": 0.3
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
                    "sustain": 0.0,
                        "release": 0.2
                    }
                },
                "mix": {
                    "crossfade": 0.6
                },
                "filter": {
                    "type": "bandpass",
                    "frequency": 1500,
                    "Q": 0.8,
                    "rolloff": -12
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 0.0,
                    "release": 0.2,
                    "baseFrequency": 800,
                    "octaves": 2
                },
                "compressor": {
                    "threshold": -12,
                    "ratio": 8,
                    "attack": 0.001,
                    "release": 0.1,
                    "knee": 8
                },
                "pitch": "G2"
            }
        }
    ]
}; 
window.drumPresets = drumPresets.presets;