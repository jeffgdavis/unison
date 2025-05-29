// StringController.js - String Synthesizer Controller extending UnisonBaseController

class StringController extends UnisonBaseController {
    constructor() {
        // Default string synthesizer patch
        const defaultPatch = {
            string: {
                attackNoise: 0.8,  // Back to original value
                dampening: 4000,
                resonance: 0.9,
                release: 0.5
            },
            strum: {
                enabled: true,
                time: 0.01,
                direction: "down"
            },
            voiceMode: 'poly',
            volume: 0.7  // Back to original volume
        };

        super(defaultPatch, 'string');
        
        // Remove audio processing fixes - connect directly to master volume
        // this.smoothingFilter = new Tone.Filter(8000, "lowpass").connect(this.masterVolume);
        // this.limiter = new Tone.Limiter(-1).connect(this.smoothingFilter);
        
        // Voice management
        this.maxVoices = 6; // Guitar-like polyphony
        this.voices = [];
        this.voiceIndex = 0;
        
        // Performance optimizations
        this.noteFrequencyCache = new Map();
        this.compiledChords = new Map();
        
        // Simplified strum timing properties
        this.lastNoteTime = 0;
        this.strumIndex = 0;
        this.lastStrumDirection = 'down';
        
        // Performance optimization: cache frequently used values
        this.isDisposed = false;
        
        // Guitar chord definitions (standard tuning: E-A-D-G-B-E)
        // Comprehensive 16-chord selection covering all major guitar playing styles
        // Standard tuning: E2(82Hz)-A2(110Hz)-D3(147Hz)-G3(196Hz)-B3(247Hz)-E4(330Hz)
        this.chordDefinitions = {
            // Row 1: Essential Major Triads (4 chords)
            'C':     ['C3', 'E3', 'G3', 'C4', 'E4'],         // Open C
            'D':     ['D3', 'A3', 'D4', 'F#4'],              // Open D
            'E':     ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],  // Open E
            'G':     ['G2', 'B2', 'D3', 'G3', 'B3', 'G4'],   // Open G
            
            // Row 2: Essential Minor Triads (4 chords)
            'Am':    ['A2', 'E3', 'A3', 'C4', 'E4'],         // Open Am
            'Dm':    ['D3', 'A3', 'D4', 'F4'],               // Open Dm
            'Em':    ['E2', 'B2', 'E3', 'G3', 'B3', 'E4'],   // Open Em
            'Bm':    ['B2', 'F#3', 'B3', 'D4', 'F#4'],       // Barre Bm
            
            // Row 3: Power Chords (4 chords)
            'E5':    ['E2', 'B2', 'E3'],                     // E power chord
            'A5':    ['A2', 'E3', 'A3'],                     // A power chord
            'D5':    ['D3', 'A3', 'D4'],                     // D power chord
            'G5':    ['G2', 'D3', 'G3'],                     // G power chord
            
            // Row 4: 7th & Extended Chords (4 chords)
            'G7':    ['G2', 'B2', 'D3', 'F3', 'B3', 'G4'],   // Dominant 7th
            'Am7':   ['A2', 'E3', 'G3', 'C4', 'E4'],         // Minor 7th
            'Dsus4': ['D3', 'A3', 'D4', 'G4'],               // Sus4 (very common)
            'Cadd9': ['C3', 'E3', 'G3', 'D4', 'E4']          // Add9 (modern sound)
        };
        
        // Pre-compile chord note arrays for performance
        // This eliminates object property lookups and array operations during playback
        for (const [name, notes] of Object.entries(this.chordDefinitions)) {
            this.compiledChords.set(name, notes.slice()); // Pre-sliced copy
        }
        
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

        // Performance: Only create if not disposed
        if (this.isDisposed) return;

        try {
            if (this.patch.voiceMode === 'poly') {
                // Create multiple PluckSynth instances for polyphonic mode
                for (let i = 0; i < this.maxVoices; i++) {
                    const voice = new Tone.PluckSynth(this.patch.string).connect(this.masterVolume);
                    this.voices.push(voice);
                }
            } else {
                // Single PluckSynth for mono mode
                const voice = new Tone.PluckSynth(this.patch.string).connect(this.masterVolume);
                this.voices.push(voice);
            }
            
        } catch (error) {
            console.error('Error creating STRING synth voices:', error);
        }
    }

    // Simple round-robin voice allocation
    getNextVoice() {
        if (this.voices.length === 0) return null;
        
        if (this.patch.voiceMode === 'mono') {
            return this.voices[0];
        }
        
        const voice = this.voices[this.voiceIndex];
        this.voiceIndex = (this.voiceIndex + 1) % this.maxVoices;
        return voice;
    }

    // Apply parameter changes to the synthesizer
    applyParameter(path, value) {
        if (this.isDisposed) return;

        // Recreate synth for voice mode or string parameter changes
        if (path === 'voiceMode' || path.startsWith('string.')) {
            this.createSynth();
        }

        // Strum parameters don't require synth recreation
        // They're handled in the noteOn method
    }

    // Apply all settings from current patch
    applyAllSettings() {
        if (this.isDisposed) return;
        this.createSynth();
    }

    // Simplified note handling with direct strum timing
    noteOn(note, velocity = 0.7) {
        if (this.voices.length === 0 || this.isDisposed) return;

        // Validate note input
        if (!note || typeof note !== 'string') {
            console.warn('Invalid note input:', note);
            return;
        }

        // If strum is disabled or mono mode, play note immediately
        if (!this.patch.strum.enabled || this.patch.voiceMode === 'mono') {
            this.playNote(note, velocity);
            return;
        }

        // Simple strum: if notes arrive within 50ms, strum them
        const now = Tone.now();
        if (now - this.lastNoteTime < 0.05) {
            // Part of a strum - apply strum delay
            this.playNote(note, velocity, this.strumIndex++ * this.patch.strum.time);
        } else {
            // New strum - reset and play immediately
            this.strumIndex = 0;
            this.playNote(note, velocity);
        }
        this.lastNoteTime = now;
    }

    // Helper method to play a single note with optional delay
    playNote(note, velocity = 0.7, delay = 0) {
        const voice = this.getNextVoice();
        if (voice) {
            try {
                voice.triggerAttack(note, Tone.now() + delay, velocity);
            } catch (e) {
                console.warn('Error triggering note:', e);
            }
        }
    }

    noteOff(note) {
        // PluckSynth doesn't need explicit note off - it decays naturally
        // based on dampening/resonance parameters in both mono and poly modes
        // This provides consistent behavior between voice modes
        if (this.isDisposed) return;
        
        // Let all notes decay naturally based on string physics simulation
        // This matches the behavior of a real plucked string instrument
    }

    // Stop all notes
    stopAllNotes() {
        // For completeness, we could trigger release on all voices
        // but PluckSynth typically handles this automatically
        if (!this.isDisposed && this.voices.length > 0) {
            this.voices.forEach(voice => {
                try {
                    voice.triggerRelease();
                } catch (e) {
                    // Ignore errors - PluckSynth may not support explicit release
                }
            });
        }
    }

    // Enhanced cleanup with proper disposal
    dispose() {
        this.isDisposed = true;
        this.stopAllNotes();
        
        // Dispose all voices
        this.voices.forEach(voice => {
            try {
                voice.dispose();
            } catch (e) {
                console.warn('Error disposing voice:', e);
            }
        });
        this.voices = [];
        
        // Clean up performance optimization caches
        this.noteFrequencyCache.clear();
        this.compiledChords.clear();
        
        // Remove disposal of audio processing components since they're removed
        // if (this.limiter) {
        //     this.limiter.dispose();
        // }
        // 
        // if (this.smoothingFilter) {
        //     this.smoothingFilter.dispose();
        // }
        
        super.dispose();
    }

    // Play a chord preset
    playChord(chordName) {
        if (this.isDisposed || !this.compiledChords.has(chordName)) {
            console.warn('Invalid chord or controller disposed:', chordName);
            return;
        }

        const notes = this.compiledChords.get(chordName);
        const baseVelocity = 0.7;

        // If strum is disabled, play all notes simultaneously
        if (!this.patch.strum.enabled) {
            notes.forEach(note => {
                this.playNote(note, baseVelocity);
            });
            return;
        }

        // Apply strum to chord
        const direction = this.patch.strum.direction === 'alternate' 
            ? this.lastStrumDirection 
            : this.patch.strum.direction;

        // Sort notes by frequency for strum direction
        const sortedNotes = [...notes].sort((a, b) => {
            const freqA = Tone.Frequency(a).toFrequency();
            const freqB = Tone.Frequency(b).toFrequency();
            return freqA - freqB;
        });

        // Down strum = low to high, Up strum = high to low
        const strumNotes = direction === 'down' ? sortedNotes : sortedNotes.reverse();
        
        // Play notes with strum timing
        strumNotes.forEach((note, index) => {
            this.playNote(note, baseVelocity, index * this.patch.strum.time);
        });

        // Update direction for alternate mode
        if (this.patch.strum.direction === 'alternate') {
            this.lastStrumDirection = this.lastStrumDirection === 'down' ? 'up' : 'down';
        }
    }
} 