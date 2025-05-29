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
        
        // Optimized voice management: simple round-robin with timestamps
        this.voiceTimestamps = new Array(this.maxVoices).fill(0);
        
        // Performance optimizations
        this.noteFrequencyCache = new Map();
        this.compiledChords = new Map();
        
        // Strum-specific properties
        this.noteBuffer = [];
        this.chordWindow = 50; // ms - time window to collect notes for chord detection
        this.chordTimeout = null;
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
            
            // Reset voice timestamps when voices are recreated
            this.voiceTimestamps = new Array(this.maxVoices).fill(0);
            
        } catch (error) {
            console.error('Error creating STRING synth voices:', error);
        }
    }

    // Get the next available voice using optimized round-robin allocation
    getNextVoice() {
        if (this.voices.length === 0) return null;
        
        if (this.patch.voiceMode === 'mono') {
            // Update timestamp for mono mode
            this.voiceTimestamps[0] = Tone.now();
            return this.voices[0];
        }
        
        // Optimized: Use round-robin instead of searching for oldest
        // This is much faster and still provides good voice distribution
        this.voiceIndex = (this.voiceIndex + 1) % this.maxVoices;
        this.voiceTimestamps[this.voiceIndex] = Tone.now();
        return this.voices[this.voiceIndex];
    }

    // Apply parameter changes to the synthesizer
    applyParameter(path, value) {
        if (this.isDisposed) return;

        // Handle voice mode changes immediately
        if (path === 'voiceMode') {
            this.createSynth();
            return;
        }

        // PluckSynth requires recreation for parameter changes
        const stringParams = [
            'string.attackNoise', 
            'string.dampening', 
            'string.resonance', 
            'string.release'
        ];

        if (stringParams.includes(path)) {
            // Optimized debouncing: Clear existing timeout and batch changes
            if (this.parameterTimeout) {
                clearTimeout(this.parameterTimeout);
            }
            
            // Longer debounce for better batching of rapid parameter changes
            this.parameterTimeout = setTimeout(() => {
                this.createSynth();
                this.parameterTimeout = null; // Clean up reference
            }, 50); // Increased from 10ms to 50ms for better batching
        }

        // Strum parameters don't require synth recreation
        // They're handled in the noteOn method
    }

    // Apply all settings from current patch
    applyAllSettings() {
        if (this.isDisposed) return;
        this.createSynth();
    }

    // Enhanced note handling with strum engine
    noteOn(note, velocity = 0.7) {
        if (this.voices.length === 0 || this.isDisposed) return;

        // Validate note input
        if (!note || typeof note !== 'string') {
            console.warn('Invalid note input:', note);
            return;
        }

        // If strum is disabled or mono mode, play note immediately
        if (!this.patch.strum.enabled || this.patch.voiceMode === 'mono') {
            const voice = this.getNextVoice();
            if (voice) {
                try {
                    voice.triggerAttack(note, Tone.now(), velocity);
                } catch (e) {
                    console.warn('Error triggering note:', e);
                }
            }
            return;
        }

        // Add to buffer for chord detection (poly mode with strum enabled)
        this.noteBuffer.push({
            note: note,
            velocity: velocity,
            time: Tone.now()
        });

        // Performance: Limit buffer size to prevent memory issues
        if (this.noteBuffer.length > 12) { // Max 12 notes in chord
            this.noteBuffer = this.noteBuffer.slice(-6); // Keep last 6
        }

        // Clear existing timeout
        if (this.chordTimeout) {
            clearTimeout(this.chordTimeout);
        }

        // Set timeout to process chord after window closes
        this.chordTimeout = setTimeout(() => {
            this.processChord();
        }, this.chordWindow);
    }

    // Process collected notes as either single note or chord
    processChord() {
        if (this.noteBuffer.length === 0 || this.isDisposed) return;

        if (this.noteBuffer.length === 1) {
            // Single note - no strum delay
            const {note, velocity} = this.noteBuffer[0];
            const voice = this.getNextVoice();
            if (voice) {
                try {
                    voice.triggerAttack(note, Tone.now(), velocity);
                } catch (e) {
                    console.warn('Error triggering single note:', e);
                }
            }
        } else {
            // Multiple notes - apply strum
            this.strumChord();
        }

        // Clear the buffer
        this.noteBuffer = [];
    }

    // Apply strum timing to chord
    strumChord() {
        if (this.isDisposed) return;

        // Optimized: Use Set for deduplication, then convert to array once
        const uniqueNotes = Array.from(new Set(this.noteBuffer.map(n => n.note)));
        const velocity = this.noteBuffer[0]?.velocity || 0.7;
        
        const direction = this.getCurrentStrumDirection();
        const sortedNotes = this.sortNotesForStrum(uniqueNotes, direction);
        
        // Optimized: Pre-calculate timing values to avoid repeated calculations
        const strumTime = this.patch.strum.time;
        const baseTime = Tone.now();
        
        sortedNotes.forEach((note, index) => {
            const voice = this.getNextVoice();
            if (voice) {
                const delay = index * strumTime;
                try {
                    voice.triggerAttack(note, baseTime + delay, velocity);
                } catch (e) {
                    console.warn(`Error triggering strummed note ${note}:`, e);
                }
            }
        });

        // Update direction for alternate mode
        if (this.patch.strum.direction === 'alternate') {
            this.lastStrumDirection = this.lastStrumDirection === 'down' ? 'up' : 'down';
        }
    }

    // Get current strum direction
    getCurrentStrumDirection() {
        return this.patch.strum.direction === 'alternate' 
            ? this.lastStrumDirection 
            : this.patch.strum.direction;
    }

    // Sort notes by frequency for strum direction
    sortNotesForStrum(notes, direction) {
        try {
            const sorted = [...notes].sort((a, b) => {
                // Use cached frequency conversions for performance
                if (!this.noteFrequencyCache.has(a)) {
                    this.noteFrequencyCache.set(a, Tone.Frequency(a).toFrequency());
                }
                if (!this.noteFrequencyCache.has(b)) {
                    this.noteFrequencyCache.set(b, Tone.Frequency(b).toFrequency());
                }
                
                const freqA = this.noteFrequencyCache.get(a);
                const freqB = this.noteFrequencyCache.get(b);
                return freqA - freqB;
            });

            // Down strum = low to high (like strumming down on guitar strings)
            // Up strum = high to low (like strumming up on guitar strings)
            return direction === 'down' ? sorted : sorted.reverse();
        } catch (error) {
            console.warn('Error sorting notes for strum:', error);
            return notes; // Return unsorted if error
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
        // Clear any pending chord processing
        if (this.chordTimeout) {
            clearTimeout(this.chordTimeout);
            this.chordTimeout = null;
        }
        if (this.parameterTimeout) {
            clearTimeout(this.parameterTimeout);
            this.parameterTimeout = null;
        }
        this.noteBuffer = [];

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

        const notes = this.compiledChords.get(chordName); // Use pre-compiled chord
        const baseVelocity = 0.7;
        // Remove dynamic velocity scaling
        // const chordVelocity = Math.min(baseVelocity, baseVelocity * (3 / notes.length));

        // If strum is disabled, play all notes simultaneously without micro-delays
        if (!this.patch.strum.enabled) {
            notes.forEach((note, index) => {
                const voice = this.getNextVoice();
                if (voice) {
                    try {
                        // Remove micro-timing variations
                        voice.triggerAttack(note, Tone.now(), baseVelocity);
                    } catch (e) {
                        console.warn('Error triggering chord note:', e);
                    }
                }
            });
            return;
        }

        // Apply strum to chord (already has natural timing spread)
        const direction = this.getCurrentStrumDirection();
        const sortedNotes = this.sortNotesForStrum(notes, direction);
        
        // Optimized: Pre-calculate timing values to avoid repeated calculations
        const strumTime = this.patch.strum.time;
        const baseTime = Tone.now();
        
        sortedNotes.forEach((note, index) => {
            const voice = this.getNextVoice();
            if (voice) {
                const delay = index * strumTime;
                try {
                    voice.triggerAttack(note, baseTime + delay, baseVelocity);
                } catch (e) {
                    console.warn(`Error triggering strummed chord note ${note}:`, e);
                }
            }
        });

        // Update direction for alternate mode
        if (this.patch.strum.direction === 'alternate') {
            this.lastStrumDirection = this.lastStrumDirection === 'down' ? 'up' : 'down';
        }
    }
} 