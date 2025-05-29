// FMController.js - FM Synthesizer Controller extending UnisonBaseController

class FMController extends UnisonBaseController {
    constructor() {
        // Default FM synthesizer patch (now always polyphonic)
        const defaultPatch = {
            harmonicity: 2.0,
            modulationIndex: 18,
            carrier: {
                envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    sustain: 0.15,
                    release: 0.8
                }
            },
            modulator: {
                envelope: {
                    attack: 0.001,
                    decay: 0.15,
                    sustain: 0,
                    release: 0.3
                }
            }
        };

        super(defaultPatch, 'fm');
        
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
            // Always create multiple FMSynth instances for polyphony
            for (let i = 0; i < this.maxVoices; i++) {
                const voice = new Tone.FMSynth({
                    harmonicity: this.patch.harmonicity,
                    modulationIndex: this.patch.modulationIndex,
                    oscillator: { type: 'sine' }, // FM always uses sine waves
                    envelope: this.patch.carrier.envelope,
                    modulation: { type: 'sine' },
                    modulationEnvelope: this.patch.modulator.envelope
                }).connect(this.masterVolume);
                
                this.voices.push(voice);
            }
        } catch (error) {
            console.error('Error creating FM synth voices:', error);
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
        // Parameters that require synth recreation for FM
        const requiresRecreation = [
            'harmonicity',
            'modulationIndex',
            'carrier.envelope.attack',
            'carrier.envelope.decay',
            'carrier.envelope.sustain',
            'carrier.envelope.release',
            'modulator.envelope.attack',
            'modulator.envelope.decay',
            'modulator.envelope.sustain',
            'modulator.envelope.release'
        ];

        if (requiresRecreation.includes(path)) {
            this.createSynth();
            return;
        }

        // Apply parameter to all voices using Tone.js set method
        try {
            this.voices.forEach(voice => {
                const parts = path.split('.');
                if (parts.length === 3) {
                    // Handle nested parameters like carrier.envelope.attack
                    const [section, subsection, param] = parts;
                    voice.set({ [section]: { [subsection]: { [param]: value } } });
                } else if (parts.length === 2) {
                    const [section, param] = parts;
                    voice.set({ [section]: { [param]: value } });
                } else {
                    voice.set({ [path]: value });
                }
            });
        } catch (e) {
            console.warn(`Could not set FM synth parameter ${path}:`, e);
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
                console.warn('Error triggering FM note:', e);
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
            console.warn('Error releasing FM note:', e);
        }
    }

    // Stop all notes
    stopAllNotes() {
        try {
            this.voices.forEach(voice => {
                voice.triggerRelease();
            });
        } catch (e) {
            console.warn('Error stopping FM notes:', e);
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