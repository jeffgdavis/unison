// MonoController.js - Mono Synthesizer Controller extending UnisonBaseController

class MonoController extends UnisonBaseController {
    constructor() {
        // Default mono synthesizer patch (now always polyphonic)
        const defaultPatch = {
            oscillator: {
                type: 'sawtooth',
                count: 3,
                spread: 20,
                width: 0.5
            },
            envelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 0.5
            },
            filter: {
                Q: 1,
                type: 'lowpass',
                rolloff: -12
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 0.5,
                baseFrequency: 200,
                octaves: 2
            }
        };

        super(defaultPatch, 'mono');
        
        // Voice management for polyphonic operation
        this.maxVoices = 6;
        this.voices = [];
        this.voiceIndex = 0;
        
        // Create initial synthesizer
        this.createSynth();
    }

    createSynth() {
        // Dispose existing voices
        this.voices.forEach(voice => {
            try {
                voice.dispose();
            } catch (e) {
                console.warn('Error disposing voice:', e);
            }
        });
        this.voices = [];

        try {
            // Always create multiple MonoSynth instances for polyphony
            for (let i = 0; i < this.maxVoices; i++) {
                const voice = new Tone.MonoSynth({
                    oscillator: this.patch.oscillator,
                    envelope: this.patch.envelope,
                    filter: this.patch.filter,
                    filterEnvelope: this.patch.filterEnvelope
                }).connect(this.masterVolume);
                
                this.voices.push(voice);
            }
        } catch (error) {
            console.error('Error creating MONO synth voices:', error);
        }
    }

    // Get the next available voice using round-robin allocation
    getNextVoice() {
        if (this.voices.length === 0) return null;
        
        const voice = this.voices[this.voiceIndex];
        this.voiceIndex = (this.voiceIndex + 1) % this.maxVoices;
        return voice;
    }

    // Apply parameter changes to the synthesizer
    applyParameter(path, value) {
        // Parameters that require synth recreation
        const requiresRecreation = [
            'oscillator.type',
            'oscillator.count', 
            'oscillator.width',
            'oscillator.spread',
            'filter.rolloff',
            'filter.type',
            'filterEnvelope.baseFrequency',
            'filterEnvelope.octaves'
        ];

        if (requiresRecreation.includes(path)) {
            this.createSynth();
            return;
        }

        // Apply parameter to all voices using Tone.js set method
        try {
            this.voices.forEach(voice => {
                const parts = path.split('.');
                if (parts.length === 2) {
                    const [section, param] = parts;
                    voice.set({ [section]: { [param]: value } });
                } else {
                    voice.set({ [path]: value });
                }
            });
        } catch (e) {
            console.warn(`Could not set synth parameter ${path}:`, e);
        }
    }

    // Apply all settings from current patch
    applyAllSettings() {
        this.createSynth();
    }

    // Note handling - simple polyphonic operation
    noteOn(note, velocity = 0.7) {
        const voice = this.getNextVoice();
        if (voice) {
            try {
                voice.triggerAttack(note, Tone.now(), velocity);
            } catch (e) {
                console.warn('Error triggering note:', e);
            }
        }
    }

    noteOff(note) {
        // For polyphonic operation, we need to track which voice plays which note
        // For simplicity, we'll just release all voices (less accurate but simpler)
        try {
            this.voices.forEach(voice => {
                voice.triggerRelease();
            });
        } catch (e) {
            console.warn('Error releasing note:', e);
        }
    }

    // Stop all notes
    stopAllNotes() {
        try {
            this.voices.forEach(voice => {
                voice.triggerRelease();
            });
        } catch (e) {
            console.warn('Error stopping notes:', e);
        }
    }

    // Cleanup
    dispose() {
        this.stopAllNotes();
        this.voices.forEach(voice => {
            try {
                voice.dispose();
            } catch (e) {
                console.warn('Error disposing voice:', e);
            }
        });
        this.voices = [];
        super.dispose();
    }
} 