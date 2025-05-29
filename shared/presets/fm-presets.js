// UNISON FM Synthesizer Presets
// 16 classic FM synthesis sounds

const fmPresets = [
    {
        "name": "DX E.Piano",
        "harmonicity": 2.0,
        "modulationIndex": 18,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.4,
                "sustain": 0.15,
                "release": 0.8
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.15,
                "sustain": 0.0,
                "release": 0.3
            }
        },
    },
    {
        "name": "DX Brass",
        "harmonicity": 1.0,
        "modulationIndex": 10,
        "carrier": {
            "envelope": {
                "attack": 0.03,
                "decay": 0.3,
                "sustain": 0.8,
                "release": 0.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.01,
                "decay": 0.25,
                "sustain": 0.4,
                "release": 0.4
            }
        },
    },
    {
        "name": "DX Bass",
        "harmonicity": 1.0,
        "modulationIndex": 25,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.2,
                "sustain": 0.6,
                "release": 0.3
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.1,
                "sustain": 0.3,
                "release": 0.2
            }
        },
    },
    {
        "name": "DX Fretless",
        "harmonicity": 1.0,
        "modulationIndex": 12,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.5,
                "sustain": 0.7,
                "release": 0.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.3,
                "sustain": 0.2,
                "release": 0.5
            }
        },
    },
    {
        "name": "DX Organ",
        "harmonicity": 2.0,
        "modulationIndex": 5,
        "carrier": {
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 1.0,
                "release": 0.1
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.8,
                "release": 0.1
            }
        },
    },
    {
        "name": "DX Clav",
        "harmonicity": 1.0,
        "modulationIndex": 35,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.05,
                "sustain": 0.3,
                "release": 0.1
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.03,
                "sustain": 0.1,
                "release": 0.08
            }
        },
    },
    {
        "name": "DX Marimba",
        "harmonicity": 8.0,
        "modulationIndex": 14,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 1.5,
                "sustain": 0.0,
                "release": 2.0
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 1.0,
                "sustain": 0.0,
                "release": 1.5
            }
        },
    },
    {
        "name": "DX Flute",
        "harmonicity": 2.0,
        "modulationIndex": 6,
        "carrier": {
            "envelope": {
                "attack": 0.08,
                "decay": 0.2,
                "sustain": 0.8,
                "release": 0.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.05,
                "decay": 0.15,
                "sustain": 0.5,
                "release": 0.4
            }
        },
    },
    {
        "name": "DX Bells",
        "harmonicity": 3.5,
        "modulationIndex": 12,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 2.0,
                "sustain": 0.0,
                "release": 2.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 1.5,
                "sustain": 0.0,
                "release": 2.0
            }
        },
    },
    {
        "name": "DX Choir",
        "harmonicity": 1.0,
        "modulationIndex": 8,
        "carrier": {
            "envelope": {
                "attack": 0.5,
                "decay": 1.0,
                "sustain": 0.9,
                "release": 2.0
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.5,
                "decay": 0.8,
                "sustain": 0.8,
                "release": 1.8
            }
        },
    },
    {
        "name": "DX Guitar",
        "harmonicity": 1.5,
        "modulationIndex": 12,
        "carrier": {
            "envelope": {
                "attack": 0.02,
                "decay": 0.3,
                "sustain": 0.7,
                "release": 0.8
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.2,
                "sustain": 0.3,
                "release": 0.5
            }
        },
    },
    {
        "name": "DX Vibes",
        "harmonicity": 3.0,
        "modulationIndex": 10,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 1.0,
                "sustain": 0.0,
                "release": 1.2
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.8,
                "sustain": 0.0,
                "release": 1.0
            }
        },
    },
    {
        "name": "DX Harpsi",
        "harmonicity": 1.0,
        "modulationIndex": 25,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.7,
                "sustain": 0.0,
                "release": 0.3
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.4,
                "sustain": 0.0,
                "release": 0.2
            }
        },
    },
    {
        "name": "DX Strings",
        "harmonicity": 1.0,
        "modulationIndex": 4,
        "carrier": {
            "envelope": {
                "attack": 0.5,
                "decay": 0.8,
                "sustain": 0.9,
                "release": 1.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.4,
                "decay": 0.6,
                "sustain": 0.7,
                "release": 1.2
            }
        },
    },
    {
        "name": "DX Koto",
        "harmonicity": 1.0,
        "modulationIndex": 15,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.8,
                "sustain": 0.0,
                "release": 0.8
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.5,
                "sustain": 0.0,
                "release": 0.5
            }
        },
    },
    {
        "name": "DX Lead",
        "harmonicity": 1.5,
        "modulationIndex": 18,
        "carrier": {
            "envelope": {
                "attack": 0.01,
                "decay": 0.3,
                "sustain": 0.5,
                "release": 0.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.2,
                "sustain": 0.2,
                "release": 0.3
            }
        },
    }
];
window.fmPresets = fmPresets;