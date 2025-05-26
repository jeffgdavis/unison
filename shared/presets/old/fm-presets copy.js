// UNISON FM Synthesizer Presets
// 16 classic FM synthesis sounds

const fmPresets = [
    {
        "name": "E.PIANO 1",
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
                "sustain": 0,
                "release": 0.3
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "FM BASS",
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
        "portamento": 0.05,
        "voiceMode": "mono"
    },
    {
        "name": "BELL TOWER",
        "harmonicity": 3.5,
        "modulationIndex": 12,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 2.0,
                "sustain": 0.0,
                "release": 3.0
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 1.5,
                "sustain": 0.0,
                "release": 2.5
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "BRASS STAB",
        "harmonicity": 1.0,
        "modulationIndex": 8,
        "carrier": {
            "envelope": {
                "attack": 0.05,
                "decay": 0.3,
                "sustain": 0.8,
                "release": 0.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.02,
                "decay": 0.2,
                "sustain": 0.4,
                "release": 0.3
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "E.PIANO 2",
        "harmonicity": 2.0,
        "modulationIndex": 15,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.8,
                "sustain": 0.4,
                "release": 1.5
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.4,
                "sustain": 0.1,
                "release": 0.8
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "ORGAN 1",
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
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "LEAD GUITAR",
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
        "portamento": 0.1,
        "voiceMode": "mono"
    },
    {
        "name": "STRINGS",
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
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "FLUTE",
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
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "METALLIC",
        "harmonicity": 5.1,
        "modulationIndex": 20,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.5,
                "sustain": 0.2,
                "release": 1.0
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.3,
                "sustain": 0.0,
                "release": 0.6
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "WOBBLE BASS",
        "harmonicity": 0.5,
        "modulationIndex": 30,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.1,
                "sustain": 0.8,
                "release": 0.2
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.05,
                "sustain": 0.9,
                "release": 0.1
            }
        },
        "portamento": 0.02,
        "voiceMode": "mono"
    },
    {
        "name": "CRYSTAL PAD",
        "harmonicity": 4.0,
        "modulationIndex": 8,
        "carrier": {
            "envelope": {
                "attack": 1.0,
                "decay": 1.5,
                "sustain": 0.8,
                "release": 2.0
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.8,
                "decay": 1.2,
                "sustain": 0.6,
                "release": 1.8
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "PLUCK LEAD",
        "harmonicity": 3.0,
        "modulationIndex": 22,
        "carrier": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.15,
                "sustain": 0.0,
                "release": 0.2
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.001,
                "decay": 0.1,
                "sustain": 0.0,
                "release": 0.15
            }
        },
        "portamento": 0,
        "voiceMode": "mono"
    },
    {
        "name": "HORN SECTION",
        "harmonicity": 1.0,
        "modulationIndex": 10,
        "carrier": {
            "envelope": {
                "attack": 0.1,
                "decay": 0.4,
                "sustain": 0.9,
                "release": 0.6
            }
        },
        "modulator": {
            "envelope": {
                "attack": 0.05,
                "decay": 0.3,
                "sustain": 0.7,
                "release": 0.4
            }
        },
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "CLAV",
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
        "portamento": 0,
        "voiceMode": "poly"
    },
    {
        "name": "MARIMBA",
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
        "portamento": 0,
        "voiceMode": "poly"
    }
];

// Expose as global variable for UnisonPatchManagerLocal
window.fmPresets = fmPresets; 