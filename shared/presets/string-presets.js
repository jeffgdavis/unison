// UNISON String Synthesizer Presets
// 16 diverse plucked string instrument presets - New Collection

const stringPresets = [
    {
        "name": "Vintage Acoustic",
        "string": {
            "attackNoise": 0.65,
            "dampening": 3200,
            "resonance": 0.88,
            "release": 0.75
        },
        "strum": {
            "enabled": true,
            "time": 0.014,
            "direction": "down"
        },
    },
    {
        "name": "Crystal Harp",
        "string": {
            "attackNoise": 0.45,
            "dampening": 6800,
            "resonance": 0.96,
            "release": 1.8
        },
        "strum": {
            "enabled": false,
            "time": 0.01,
            "direction": "up"
        },
    },
    {
        "name": "Aggressive Pick",
        "string": {
            "attackNoise": 1.0,
            "dampening": 7500,
            "resonance": 0.92,
            "release": 0.2
        },
        "strum": {
            "enabled": true,
            "time": 0.004,
            "direction": "down"
        },
    },
    {
        "name": "Warm Bass",
        "string": {
            "attackNoise": 0.7,
            "dampening": 1800,
            "resonance": 0.84,
            "release": 0.9
        },
        "strum": {
            "enabled": false,
            "time": 0.01,
            "direction": "down"
        },
    },
    {
        "name": "Ethereal Pad",
        "string": {
            "attackNoise": 0.3,
            "dampening": 2800,
            "resonance": 0.98,
            "release": 2.5
        },
        "strum": {
            "enabled": true,
            "time": 0.025,
            "direction": "alternate"
        },
    },
    {
        "name": "Percussive Pluck",
        "string": {
            "attackNoise": 0.95,
            "dampening": 8500,
            "resonance": 0.85,
            "release": 0.08
        },
        "strum": {
            "enabled": false,
            "time": 0.01,
            "direction": "down"
        },
    },
    {
        "name": "Folk Strum",
        "string": {
            "attackNoise": 0.75,
            "dampening": 4500,
            "resonance": 0.91,
            "release": 0.6
        },
        "strum": {
            "enabled": true,
            "time": 0.018,
            "direction": "down"
        },
    },
    {
        "name": "Metallic Ring",
        "string": {
            "attackNoise": 0.85,
            "dampening": 9200,
            "resonance": 0.99,
            "release": 1.2
        },
        "strum": {
            "enabled": true,
            "time": 0.006,
            "direction": "up"
        },
    },
    {
        "name": "Soft Fingerpick",
        "string": {
            "attackNoise": 0.4,
            "dampening": 3600,
            "resonance": 0.89,
            "release": 1.1
        },
        "strum": {
            "enabled": true,
            "time": 0.022,
            "direction": "alternate"
        },
    },
    {
        "name": "Bright Mandolin",
        "string": {
            "attackNoise": 0.9,
            "dampening": 6200,
            "resonance": 0.94,
            "release": 0.35
        },
        "strum": {
            "enabled": true,
            "time": 0.003,
            "direction": "alternate"
        },
    },
    {
        "name": "Deep Resonance",
        "string": {
            "attackNoise": 0.6,
            "dampening": 2200,
            "resonance": 0.97,
            "release": 1.6
        },
        "strum": {
            "enabled": false,
            "time": 0.01,
            "direction": "down"
        },
    },
    {
        "name": "Funky Slap",
        "string": {
            "attackNoise": 1.0,
            "dampening": 5800,
            "resonance": 0.87,
            "release": 0.15
        },
        "strum": {
            "enabled": false,
            "time": 0.01,
            "direction": "down"
        },
    },
    {
        "name": "Ambient Wash",
        "string": {
            "attackNoise": 0.25,
            "dampening": 2500,
            "resonance": 0.95,
            "release": 3.0
        },
        "strum": {
            "enabled": true,
            "time": 0.035,
            "direction": "up"
        },
    },
    {
        "name": "Banjo Roll",
        "string": {
            "attackNoise": 0.88,
            "dampening": 7800,
            "resonance": 0.9,
            "release": 0.25
        },
        "strum": {
            "enabled": true,
            "time": 0.002,
            "direction": "alternate"
        },
    },
    {
        "name": "Glassy Chime",
        "string": {
            "attackNoise": 0.55,
            "dampening": 8800,
            "resonance": 0.98,
            "release": 2.2
        },
        "strum": {
            "enabled": false,
            "time": 0.01,
            "direction": "up"
        },
    },
    {
        "name": "Distorted Edge",
        "string": {
            "attackNoise": 1.0,
            "dampening": 4800,
            "resonance": 0.82,
            "release": 0.4
        },
        "strum": {
            "enabled": true,
            "time": 0.008,
            "direction": "down"
        },
    }
];

// Make presets globally available
if (typeof window !== 'undefined') {
    window.stringPresets = stringPresets;
} 