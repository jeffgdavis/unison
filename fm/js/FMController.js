// FMController.js - FM Synthesizer Controller extending UnisonBaseController

class FMController extends UnisonBaseController {
    constructor() {
        // Default FM synthesizer patch
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
            },
            portamento: 0,
            voiceMode: 'poly'
        };

        super(defaultPatch, 'fm');
        
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
                voice: Tone.FMSynth,
                options: {
                    harmonicity: this.patch.harmonicity,
                    modulationIndex: this.patch.modulationIndex,
                    oscillator: { type: 'sine' }, // FM always uses sine waves
                    envelope: this.patch.carrier.envelope,
                    modulation: { type: 'sine' },
                    modulationEnvelope: this.patch.modulator.envelope
                }
            }).connect(this.masterVolume);
        } else {
            this.synth = new Tone.FMSynth({
                harmonicity: this.patch.harmonicity,
                modulationIndex: this.patch.modulationIndex,
                oscillator: { type: 'sine' },
                envelope: this.patch.carrier.envelope,
                modulation: { type: 'sine' },
                modulationEnvelope: this.patch.modulator.envelope
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
            'modulator.envelope.release',
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
            if (parts.length === 3) {
                // Handle nested parameters like carrier.envelope.attack
                const [section, subsection, param] = parts;
                this.synth.set({ [section]: { [subsection]: { [param]: value } } });
            } else if (parts.length === 2) {
                const [section, param] = parts;
                this.synth.set({ [section]: { [param]: value } });
            } else if (path === 'portamento') {
                this.synth.portamento = value;
            } else {
                this.synth.set({ [path]: value });
            }
        } catch (e) {
            console.warn(`Could not set FM synth parameter ${path}:`, e);
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
            console.warn('Error triggering FM note:', e);
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
            console.warn('Error releasing FM note:', e);
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
                console.warn('Error stopping FM notes:', e);
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