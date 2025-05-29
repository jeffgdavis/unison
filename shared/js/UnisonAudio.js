/**
 * ============================================================================
 * UNISON AUDIO LIBRARY
 * ============================================================================
 * 
 * Audio engine and sound creation library for the UNISON synthesizer suite.
 * Contains audio utilities, base controllers, patch randomization, and audio parameter management.
 * 
 * Author: UNISON Development Team
 * Version: 2.0 (Split from UnisonCore)
 * ============================================================================
 */

// ============================================================================
// CORE AUDIO UTILITIES
// ============================================================================

/**
 * UNISON Audio Core Library
 * Provides shared audio utilities and base classes for all synthesizers
 */
class UnisonCore {
    /**
     * Audio utility functions used across all synthesizers
     */
    static audio = {
        /**
         * Convert linear gain (0-1) to decibels
         * This fixes the FM synth volume issue where conversion was incorrect
         */
        linearToDb(linearValue) {
            if (linearValue <= 0) return -Infinity;
            return 20 * Math.log10(linearValue);
        },
        
        /**
         * Convert decibels back to linear gain (0-1)
         */
        dbToLinear(dbValue) {
            if (dbValue <= -60) return 0;
            return Math.pow(10, dbValue / 20);
        },
        
        /**
         * Logarithmic frequency scaling for filter controls
         * This replaces the duplicated logScale/logPosition functions
         */
        freqToSliderPosition(freq, minFreq = 200, maxFreq = 8000) {
            return 100 * (Math.log(freq/minFreq) / Math.log(maxFreq/minFreq));
        },
        
        sliderPositionToFreq(position, minFreq = 200, maxFreq = 8000) {
            return minFreq * Math.pow(maxFreq/minFreq, position/100);
        }
    };
    
    /**
     * Random utilities for patch generation
     * Consolidates randomization functions used in all synthesizers
     */
    static random = {
        float(min, max) {
            return min + Math.random() * (max - min);
        },
        
        int(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        choice(array) {
            return array[Math.floor(Math.random() * array.length)];
        }
    };
}

// ============================================================================
// BASE AUDIO CONTROLLER
// ============================================================================

/**
 * Base controller class that all synthesizers will extend
 * This provides consistent parameter handling and patch management
 */
class UnisonBaseController {
    constructor(initialPatch, synthType) {
        this.synthType = synthType;
        this.patch = JSON.parse(JSON.stringify(initialPatch));
        
        // Standard master volume at -3.1dB (0.7 linear)
        this.masterVolume = new Tone.Volume(-3.1).toDestination();
        this.masterVolumeLinear = 0.7;
        
        // Ensure Tone.js is started
        this.ensureToneStarted();
    }
    
    async ensureToneStarted() {
        if (Tone.context.state !== 'running') {
            await Tone.start();
            console.log('Tone.js started');
        }
    }
    
    /**
     * Update a parameter by path (e.g., "envelope.attack")
     * This standardizes parameter updates across all synthesizers
     */
    updateParameter(path, value) {
        // Special handling for master volume with correct dB conversion
        if (path === 'volume' || path === 'masterVolume') {
            this.updateMasterVolume(value);
            return;
        }
        
        // Update the patch data structure
        this.updatePatchValue(path, value);
        
        // Apply to the audio engine (implemented by each synthesizer)
        this.applyParameter(path, value);
    }
    
    /**
     * Update nested patch value using dot notation path
     */
    updatePatchValue(path, value) {
        const parts = path.split('.');
        let current = this.patch;
        
        // Navigate to the correct nested object
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        
        // Set the final value
        current[parts[parts.length - 1]] = value;
    }
    
    /**
     * Update master volume with proper dB conversion
     * This fixes the volume handling inconsistency issue
     */
    updateMasterVolume(linearValue) {
        this.masterVolumeLinear = linearValue;
        const dbValue = UnisonCore.audio.linearToDb(linearValue);
        this.masterVolume.volume.value = dbValue;
    }
    
    /**
     * Get current patch data for saving
     */
    getPatch() {
        return JSON.parse(JSON.stringify(this.patch));
    }
    
    /**
     * Apply a complete patch (used for presets and loading)
     */
    applyPatch(patchData) {
        this.patch = JSON.parse(JSON.stringify(patchData));
        this.applyAllSettings();
        return true;
    }
    
    /**
     * Dispose of audio resources
     */
    dispose() {
        if (this.synth) {
            this.synth.dispose();
        }
        if (this.masterVolume) {
            this.masterVolume.dispose();
        }
    }
    
    // Abstract methods that each synthesizer must implement
    applyParameter(path, value) {
        throw new Error('applyParameter must be implemented by subclass');
    }
    
    applyAllSettings() {
        throw new Error('applyAllSettings must be implemented by subclass');
    }
}

// ============================================================================
// PATCH RANDOMIZATION SYSTEM
// ============================================================================

/**
 * Randomizer class for generating random patches for all synth types
 */
class UnisonRandomizer {
    /**
     * Generate random patch for MONO synthesizer
     */
    static randomMono(currentPatch) {
        const waveforms = ['sine', 'triangle', 'pulse', 'sawtooth', 'fatsawtooth'];
        const rolloffs = [-12, -24];
        
        return {
            oscillator: {
                type: UnisonCore.random.choice(waveforms),
                count: UnisonCore.random.int(2, 4),
                spread: UnisonCore.random.int(5, 20),
                width: UnisonCore.random.float(0.1, 0.9)
            },
            envelope: {
                attack: UnisonCore.random.float(0.001, 0.5),
                decay: UnisonCore.random.float(0.05, 1.0),
                sustain: UnisonCore.random.float(0.1, 0.9),
                release: UnisonCore.random.float(0.05, 2.0)
            },
            filter: {
                Q: UnisonCore.random.float(0.1, 8.0),
                type: 'lowpass',
                rolloff: UnisonCore.random.choice(rolloffs)
            },
            filterEnvelope: {
                attack: UnisonCore.random.float(0.001, 1.0),
                decay: UnisonCore.random.float(0.1, 1.5),
                sustain: UnisonCore.random.float(0.0, 0.8),
                release: UnisonCore.random.float(0.1, 2.0),
                baseFrequency: UnisonCore.random.float(200, 4000),
                octaves: UnisonCore.random.float(0.5, 3.0)
            },
            portamento: UnisonCore.random.float(0, 0.3),
            voiceMode: currentPatch.voiceMode || 'mono'
        };
    }
    
    /**
     * Generate random patch for FM synthesizer
     */
    static randomFM(currentPatch) {
        return {
            harmonicity: UnisonCore.random.float(0.5, 8.0),
            modulationIndex: UnisonCore.random.float(0, 50),
            carrier: {
                envelope: {
                    attack: UnisonCore.random.float(0.001, 1.0),
                    decay: UnisonCore.random.float(0.1, 2.0),
                    sustain: UnisonCore.random.float(0.0, 1.0),
                    release: UnisonCore.random.float(0.1, 3.0)
                }
            },
            modulator: {
                envelope: {
                    attack: UnisonCore.random.float(0.001, 1.0),
                    decay: UnisonCore.random.float(0.05, 1.5),
                    sustain: UnisonCore.random.float(0.0, 0.8),
                    release: UnisonCore.random.float(0.05, 2.0)
                }
            },
            portamento: UnisonCore.random.float(0, 0.3),
            voiceMode: currentPatch.voiceMode || 'poly'
        };
    }
    
    /**
     * Generate random patch for DRUM synthesizer
     */
    static randomDrum(currentPatch) {
        const oscillatorTypes = ['sine', 'triangle', 'square', 'sawtooth'];
        const noiseTypes = ['white', 'pink', 'brown'];
        const filterTypes = ['lowpass', 'highpass', 'bandpass', 'notch'];
        const rolloffs = [-12, -24];
        const pitches = ['C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2'];
        
        return {
            power: {
                membrane: UnisonCore.random.choice([true, false]),
                noise: UnisonCore.random.choice([true, false]),
                // Preserve current filter and compressor power states
                filter: currentPatch.power ? currentPatch.power.filter : true,
                compressor: currentPatch.power ? currentPatch.power.compressor : true
            },
            membrane: {
                pitchDecay: UnisonCore.random.float(0.02, 0.3),
                octaves: UnisonCore.random.float(1, 7),
                oscillator: {
                    type: UnisonCore.random.choice(oscillatorTypes)
                },
                envelope: {
                    attack: UnisonCore.random.float(0.001, 0.1),
                    decay: UnisonCore.random.float(0.05, 2.0),
                    sustain: UnisonCore.random.float(0.0, 0.3),
                    release: UnisonCore.random.float(0.05, 2.0)
                }
            },
            noise: {
                noise: {
                    type: UnisonCore.random.choice(noiseTypes),
                    playbackRate: UnisonCore.random.float(0.5, 8)
                },
                envelope: {
                    attack: UnisonCore.random.float(0.001, 0.1),
                    decay: UnisonCore.random.float(0.02, 1.5),
                    sustain: UnisonCore.random.float(0.0, 0.2),
                    release: UnisonCore.random.float(0.02, 1.5)
                }
            },
            mix: {
                crossfade: UnisonCore.random.float(0.1, 0.9)
            },
            filter: {
                type: UnisonCore.random.choice(filterTypes),
                frequency: UnisonCore.random.float(80, 8000),
                Q: UnisonCore.random.float(0.5, 8),
                rolloff: UnisonCore.random.choice(rolloffs)
            },
            filterEnvelope: {
                attack: UnisonCore.random.float(0.001, 0.1),
                decay: UnisonCore.random.float(0.02, 1.0),
                sustain: UnisonCore.random.float(0.1, 0.8),
                release: UnisonCore.random.float(0.05, 2.0),
                baseFrequency: UnisonCore.random.float(80, 8000),
                octaves: UnisonCore.random.float(0.3, 3)
            },
            compressor: {
                threshold: UnisonCore.random.float(-25, -6),
                ratio: UnisonCore.random.float(2, 20),
                attack: UnisonCore.random.float(0.001, 0.01),
                release: UnisonCore.random.float(0.005, 0.5),
                knee: UnisonCore.random.float(0, 12)
            },
            pitch: UnisonCore.random.choice(pitches)
        };
    }

    /**
     * Generate random patch for STRING synthesizer
     */
    static randomString(currentPatch) {
        const strumDirections = ['down', 'up', 'alternate'];
        
        return {
            string: {
                attackNoise: UnisonCore.random.float(0.3, 1.0),
                dampening: UnisonCore.random.float(2000, 8000),
                resonance: UnisonCore.random.float(0.7, 0.99),
                release: UnisonCore.random.float(0.1, 1.5)
            },
            strum: {
                enabled: currentPatch.strum ? currentPatch.strum.enabled : true,
                time: UnisonCore.random.float(0.005, 0.03),
                direction: UnisonCore.random.choice(strumDirections)
            },
            voiceMode: currentPatch.voiceMode || 'poly'
        };
    }
}

// ============================================================================
// SYNTHESIZER AUDIO CONFIGURATION OBJECTS
// ============================================================================

/**
 * Audio parameter mappings and formatters for UI controls
 */
const AUDIO_FORMATTERS = {
    fixed1: (v) => v.toFixed(1),
    fixed2: (v) => v.toFixed(2),
    fixed3: (v) => v.toFixed(3),
    integer: (v) => Math.round(v),
    frequency: (v) => Math.round(v) + 'Hz',
    percentage: (v) => Math.round(v * 100) + '%',
    db: (v) => Math.round(v) + 'dB'
};

/**
 * Configuration object for MONO synthesizer audio parameters
 */
const MONO_AUDIO_CONFIG = {
    randomizeFunction: UnisonRandomizer.randomMono,
    
    // Parameter mappings for audio controls
    parameters: [
        // Oscillator controls
        { controlId: 'waveform', path: 'oscillator.type', eventType: 'change' },
        { controlId: 'pw', path: 'oscillator.width', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'count', path: 'oscillator.count', formatter: AUDIO_FORMATTERS.integer },
        { controlId: 'spread', path: 'oscillator.spread', formatter: AUDIO_FORMATTERS.integer },
        
        // Envelope controls
        { controlId: 'attack', path: 'envelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'decay', path: 'envelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'sustain', path: 'envelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'release', path: 'envelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Filter controls
        { controlId: 'resonance', path: 'filter.Q', formatter: AUDIO_FORMATTERS.fixed1 },
        { controlId: 'rolloff', path: 'filter.rolloff', eventType: 'change' },
        
        // Filter envelope controls
        { controlId: 'f-attack', path: 'filterEnvelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'f-decay', path: 'filterEnvelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'f-sustain', path: 'filterEnvelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'f-release', path: 'filterEnvelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'octaves', path: 'filterEnvelope.octaves', formatter: AUDIO_FORMATTERS.fixed1 },
        
        // Performance controls
        { controlId: 'volume', path: 'volume', formatter: (v) => Math.round(v * 100) + '%' },
        { controlId: 'portamento', path: 'portamento', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Special controls with custom handlers
        { controlId: 'baseFreq', path: 'filterEnvelope.baseFrequency', customHandler: 'handleMonoBaseFrequency' },
    ]
};

/**
 * Configuration object for FM synthesizer audio parameters
 */
const FM_AUDIO_CONFIG = {
    randomizeFunction: UnisonRandomizer.randomFM,
    
    // Parameter mappings for audio controls
    parameters: [
        // FM-specific controls
        { controlId: 'harmonicity', path: 'harmonicity', formatter: AUDIO_FORMATTERS.fixed1 },
        { controlId: 'modulationIndex', path: 'modulationIndex', formatter: AUDIO_FORMATTERS.fixed1 },
        
        // Carrier envelope controls
        { controlId: 'carrier-attack', path: 'carrier.envelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'carrier-decay', path: 'carrier.envelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'carrier-sustain', path: 'carrier.envelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'carrier-release', path: 'carrier.envelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Modulator envelope controls
        { controlId: 'modulator-attack', path: 'modulator.envelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'modulator-decay', path: 'modulator.envelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'modulator-sustain', path: 'modulator.envelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'modulator-release', path: 'modulator.envelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Performance controls
        { controlId: 'volume', path: 'volume', formatter: (v) => v.toFixed(1) },
        { controlId: 'portamento', path: 'portamento', formatter: AUDIO_FORMATTERS.fixed3 },
    ]
};

/**
 * Configuration object for DRUM synthesizer audio parameters
 */
const DRUM_AUDIO_CONFIG = {
    randomizeFunction: UnisonRandomizer.randomDrum,
    
    // Parameter mappings for audio controls
    parameters: [
        // Membrane controls
        { controlId: 'membrane-pitchDecay', path: 'membrane.pitchDecay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'membrane-octaves', path: 'membrane.octaves', formatter: AUDIO_FORMATTERS.fixed1 },
        { controlId: 'membrane-osc-type', path: 'membrane.oscillator.type', eventType: 'change' },
        
        // Membrane envelope controls
        { controlId: 'membrane-attack', path: 'membrane.envelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'membrane-decay', path: 'membrane.envelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'membrane-sustain', path: 'membrane.envelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'membrane-release', path: 'membrane.envelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Noise controls
        { controlId: 'noise-type', path: 'noise.noise.type', eventType: 'change' },
        { controlId: 'noise-playbackRate', path: 'noise.noise.playbackRate', formatter: AUDIO_FORMATTERS.fixed1 },
        
        // Noise envelope controls
        { controlId: 'noise-attack', path: 'noise.envelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'noise-decay', path: 'noise.envelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'noise-sustain', path: 'noise.envelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'noise-release', path: 'noise.envelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Mix controls
        { controlId: 'mix-crossfade', path: 'mix.crossfade', formatter: AUDIO_FORMATTERS.fixed2 },
        
        // Filter controls
        { controlId: 'filter-type', path: 'filter.type', eventType: 'change' },
        { controlId: 'resonance', path: 'filter.Q', formatter: AUDIO_FORMATTERS.fixed1 },
        { controlId: 'rolloff', path: 'filter.rolloff', eventType: 'change' },
        { controlId: 'octaves', path: 'filterEnvelope.octaves', formatter: AUDIO_FORMATTERS.fixed1 },
        
        // Filter envelope controls
        { controlId: 'f-attack', path: 'filterEnvelope.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'f-decay', path: 'filterEnvelope.decay', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'f-sustain', path: 'filterEnvelope.sustain', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'f-release', path: 'filterEnvelope.release', formatter: AUDIO_FORMATTERS.fixed3 },
        
        // Compressor controls
        { controlId: 'comp-threshold', path: 'compressor.threshold', formatter: AUDIO_FORMATTERS.db },
        { controlId: 'comp-ratio', path: 'compressor.ratio', formatter: AUDIO_FORMATTERS.fixed1 },
        { controlId: 'comp-attack', path: 'compressor.attack', formatter: AUDIO_FORMATTERS.fixed3 },
        { controlId: 'comp-release', path: 'compressor.release', formatter: AUDIO_FORMATTERS.fixed2 },
        { controlId: 'comp-knee', path: 'compressor.knee', formatter: AUDIO_FORMATTERS.fixed1 },
        
        // Performance controls
        { controlId: 'master-volume', path: 'volume', formatter: (v) => v.toFixed(1) },
        { controlId: 'drum-pitch', path: 'pitch', eventType: 'change' },
        
        // Special controls with custom handlers
        { controlId: 'baseFreq', path: 'filter.frequency', customHandler: 'handleDrumFilterFrequency' },
    ]
};

/**
 * Configuration object for STRING synthesizer audio parameters
 */
const STRING_AUDIO_CONFIG = {
    randomizeFunction: UnisonRandomizer.randomString,
    
    // Parameter mappings for audio controls
    parameters: [
        // String controls with improved scaling
        { controlId: 'attack-noise', path: 'string.attackNoise', formatter: AUDIO_FORMATTERS.fixed2 },
        { 
            controlId: 'dampening', 
            path: 'string.dampening', 
            formatter: AUDIO_FORMATTERS.frequency,
            customHandler: 'handleStringDampening'  // Add custom logarithmic scaling
        },
        { 
            controlId: 'resonance', 
            path: 'string.resonance', 
            formatter: AUDIO_FORMATTERS.fixed3,  // More precision
            transform: (v) => 0.8 + (v * 0.195)  // Map to 0.8-0.995 range for better control
        },
        { controlId: 'release', path: 'string.release', formatter: AUDIO_FORMATTERS.fixed2 },
        
        // Strum controls
        { controlId: 'strum-enabled', path: 'strum.enabled', eventType: 'click', customHandler: 'handleStrumPowerButton' },
        { controlId: 'strum-time', path: 'strum.time', formatter: v => Math.round(v * 1000) + 'ms' },
        { controlId: 'strum-direction', path: 'strum.direction', eventType: 'change' },
        
        // Master controls
        { controlId: 'volume', path: 'volume', formatter: AUDIO_FORMATTERS.percentage },
    ]
};

// ============================================================================
// INITIALIZATION AND EXPORTS
// ============================================================================

// Immediately make classes globally available (compatible with file:// protocol)
(function() {
    'use strict';
    
    // Attach all classes to window object immediately
    if (typeof window !== 'undefined') {
        window.UnisonCore = UnisonCore;
        window.UnisonBaseController = UnisonBaseController;
        window.UnisonRandomizer = UnisonRandomizer;
        
        // Export audio configuration objects
        window.MONO_AUDIO_CONFIG = MONO_AUDIO_CONFIG;
        window.FM_AUDIO_CONFIG = FM_AUDIO_CONFIG;
        window.DRUM_AUDIO_CONFIG = DRUM_AUDIO_CONFIG;
        window.STRING_AUDIO_CONFIG = STRING_AUDIO_CONFIG;
        window.AUDIO_FORMATTERS = AUDIO_FORMATTERS;
    }
    
    console.log('🎵 UNISON Audio Library loaded');
})(); 