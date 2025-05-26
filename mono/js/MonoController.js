// MonoController.js - Mono Synthesizer Controller extending UnisonBaseController

class MonoController extends UnisonBaseController {
    constructor() {
        // Default mono synthesizer patch
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
            },
            portamento: 0,
            voiceMode: 'mono'
        };

        super(defaultPatch, 'mono');
        
        // Initialize active notes tracking
        this.activeNotes = {};
        
        // Create initial synthesizer
        this.createSynth();
    }

    createSynth() {
        // Dispose existing synth if it exists
        if (this.synth) {
            this.synth.dispose();
        }

        // Create synth based on voice mode
        if (this.patch.voiceMode === 'poly') {
            this.synth = new Tone.PolySynth({
                maxPolyphony: 8,
                voice: Tone.MonoSynth,
                options: {
                    oscillator: this.patch.oscillator,
                    envelope: this.patch.envelope,
                    filter: this.patch.filter,
                    filterEnvelope: this.patch.filterEnvelope
                }
            }).connect(this.masterVolume);
        } else {
            this.synth = new Tone.MonoSynth({
                oscillator: this.patch.oscillator,
                envelope: this.patch.envelope,
                filter: this.patch.filter,
                filterEnvelope: this.patch.filterEnvelope
            }).connect(this.masterVolume);
        }

        // Set portamento
        this.synth.portamento = this.patch.portamento;
    }

    // Apply parameter changes to the synthesizer
    applyParameter(path, value) {
        // Handle voice mode changes
        if (path === 'voiceMode') {
            this.createSynth();
            return;
        }

        // Parameters that require synth recreation
        const requiresRecreation = [
            'oscillator.type',
            'oscillator.count', 
            'oscillator.width',
            'oscillator.spread',
            'filter.rolloff',
            'filter.type',
            'filterEnvelope.baseFrequency',
            'filterEnvelope.octaves',
            'portamento'
        ];

        if (requiresRecreation.includes(path)) {
            this.createSynth();
            return;
        }

        // Apply parameter using Tone.js set method
        try {
            if (!this.synth) return;

            const parts = path.split('.');
            if (parts.length === 2) {
                const [section, param] = parts;
                this.synth.set({ [section]: { [param]: value } });
            } else if (path === 'portamento') {
                this.synth.portamento = value;
            } else {
                this.synth.set({ [path]: value });
            }
        } catch (e) {
            console.warn(`Could not set synth parameter ${path}:`, e);
        }
    }

    // Apply all settings from current patch
    applyAllSettings() {
        this.createSynth();
    }

    // Note handling
    noteOn(note, velocity = 0.7) {
        if (!this.synth) return;

        try {
            if (this.patch.voiceMode === 'poly') {
                this.synth.triggerAttack(note, Tone.now(), velocity);
            } else {
                // For mono mode, track active notes
                this.activeNotes[note] = true;
                this.synth.triggerAttack(note, Tone.now(), velocity);
            }
        } catch (e) {
            console.warn('Error triggering note:', e);
        }
    }

    noteOff(note) {
        if (!this.synth) return;

        try {
            if (this.patch.voiceMode === 'poly') {
                this.synth.triggerRelease(note);
            } else {
                // For mono mode, always trigger release
                this.synth.triggerRelease();
                // Clear the active notes
                if (note && this.activeNotes[note]) {
                    delete this.activeNotes[note];
                }
            }
        } catch (e) {
            console.warn('Error releasing note:', e);
        }
    }

    // Stop all notes
    stopAllNotes() {
        if (this.synth) {
            try {
                if (this.patch.voiceMode === 'poly') {
                    this.synth.releaseAll();
                } else {
                    this.synth.triggerRelease();
                }
            } catch (e) {
                console.warn('Error stopping notes:', e);
            }
        }
        this.activeNotes = {};
    }

    // Cleanup
    dispose() {
        this.stopAllNotes();
        if (this.synth) {
            this.synth.dispose();
        }
        super.dispose();
    }
} 