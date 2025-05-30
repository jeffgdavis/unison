// MetalController.js - Metal Synthesizer Controller extending UnisonBaseController

class MetalController extends UnisonBaseController {
    constructor() {
        // Default metal synthesizer patch with nested structure like other synths
        const defaultPatch = {
            // Harmonics section (similar to FM's harmonicity/modulationIndex)
            harmonics: {
                harmonicity: 15,         // Harmonic ratio (range: 0-100)
                modulationIndex: 32,     // Brightness/harshness (range: 0-100)
                octaves: 1.5,           // FM range (range: 0-5)
                resonance: 0.99         // Filter resonance (range: 0-1, typically >0.9)
            },
            // Envelope section (standard ADSR like other synths)
            envelope: {
                attack: 0.001,
                decay: 1.5,
                sustain: 0,
                release: 2.0
            }
        };

        super(defaultPatch, 'metal');
        
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
            // Always create multiple MetalSynth instances for polyphony
            for (let i = 0; i < this.maxVoices; i++) {
                const voice = new Tone.MetalSynth({
                    harmonicity: this.patch.harmonics.harmonicity,
                    modulationIndex: this.patch.harmonics.modulationIndex,
                    resonance: this.patch.harmonics.resonance,
                    octaves: this.patch.harmonics.octaves,
                    envelope: this.patch.envelope
                }).connect(this.masterVolume);
                
                this.voices.push(voice);
            }
        } catch (error) {
            console.error('Error creating METAL synth voices:', error);
        }
    }

    // Get the next available voice using round-robin allocation
    getNextVoice() {
        if (this.voices.length === 0) return null;
        
        const voice = this.voices[this.voiceIndex];
        this.voiceIndex = (this.voiceIndex + 1) % this.maxVoices;
        return voice;
    }

    // Apply parameter changes to the synthesizer (improved selectivity like other synths)
    applyParameter(path, value) {
        // Parameters that require synth recreation (core synthesis parameters)
        const requiresRecreation = [
            'harmonics.harmonicity',
            'harmonics.modulationIndex',
            'harmonics.resonance',
            'harmonics.octaves'
        ];

        if (requiresRecreation.includes(path)) {
            this.createSynth();
            return;
        }

        // Apply envelope parameters directly to voices (more efficient)
        try {
            this.voices.forEach(voice => {
                const parts = path.split('.');
                if (parts.length === 2) {
                    const [section, param] = parts;
                    voice.set({ [section]: { [param]: value } });
                } else if (parts.length === 1) {
                    voice.set({ [path]: value });
                }
            });
        } catch (e) {
            console.warn(`Could not set METAL synth parameter ${path}:`, e);
        }
    }

    // Apply all settings from current patch
    applyAllSettings() {
        this.createSynth();
    }

    // Note handling - simple polyphonic operation with triggerAttackRelease for percussion
    noteOn(note, velocity = 0.7) {
        const voice = this.getNextVoice();
        if (voice) {
            try {
                // Use triggerAttackRelease for one-shot metallic percussion sounds
                // Duration is controlled by the envelope settings
                voice.triggerAttackRelease(note, '8n', Tone.now(), velocity);
            } catch (e) {
                console.warn('Error triggering METAL note:', e);
            }
        }
    }

    noteOff(note) {
        // For triggerAttackRelease, we don't need to handle noteOff
        // The sound will naturally decay according to the envelope
        // This method is kept for compatibility with the keyboard interface
    }

    // Stop all notes
    stopAllNotes() {
        // For triggerAttackRelease, notes will naturally decay
        // We can still call triggerRelease to stop any ongoing notes immediately if needed
        try {
            this.voices.forEach(voice => {
                voice.triggerRelease();
            });
        } catch (e) {
            console.warn('Error stopping METAL notes:', e);
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