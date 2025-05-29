// DrumController.js - Drum Synthesizer Controller extending UnisonBaseController

class DrumController extends UnisonBaseController {
    constructor() {
        // Default drum synthesizer patch
        const defaultPatch = {
            // Module power states (only for filter and compressor, not synthesis sources)
            power: {
                filter: true,    // Has power button
                compressor: true // Has power button
            },
            // Each drum component gets its own complete configuration
            membrane: {
                pitchDecay: 0.1,
                octaves: 4,
                oscillator: {
                    type: 'sine'
                },
                envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    sustain: 0.01,
                    release: 0.4
                }
            },
            noise: {
                noise: {
                    type: 'white',
                    playbackRate: 1
                },
                envelope: {
                    attack: 0.001,
                    decay: 0.2,
                    sustain: 0,
                    release: 0.2
                }
            },
            // Mixing controls
            mix: {
                crossfade: 0.5  // 0 = 100% membrane, 1 = 100% noise
            },
            // Shared filter (can be bypassed with power button)
            filter: {
                type: 'lowpass',
                frequency: 5000,
                Q: 1,
                rolloff: -12
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 0.5,
                baseFrequency: 5000,
                octaves: 2
            },
            // Compressor (can be bypassed with power button)
            compressor: {
                threshold: -12,
                ratio: 4,
                attack: 0.003,
                release: 0.1,
                knee: 6
            },
            // Drum-specific settings
            pitch: 'C2'
        };

        super(defaultPatch, 'drum');
        
        // Create the synthesis components
        this.createSynthComponents();
        
        // Set up signal routing
        this.setupSignalPath();
        
        // Apply initial settings
        this.applyAllSettings();
    }

    createSynthComponents() {
        // Create multiple instances for polyphony (2 voices each)
        this.membraneVoices = [
            new Tone.MembraneSynth(this.patch.membrane),
            new Tone.MembraneSynth(this.patch.membrane)
        ];
        
        this.noiseVoices = [
            new Tone.NoiseSynth(this.patch.noise),
            new Tone.NoiseSynth(this.patch.noise)
        ];
        
        // Voice allocation counters
        this.membraneVoiceIndex = 0;
        this.noiseVoiceIndex = 0;
        
        // Individual gain controls for mixing
        const crossfade = this.patch.mix.crossfade;
        this.membraneGain = new Tone.Gain(1 - crossfade);
        this.noiseGain = new Tone.Gain(crossfade);
        
        // Shared filter and envelope
        this.filter = new Tone.Filter(this.patch.filter);
        this.filterEnvelope = new Tone.Envelope(this.patch.filterEnvelope);
        
        // Compressor
        this.compressor = new Tone.Compressor(this.patch.compressor);
    }

    setupSignalPath() {
        // Connect voices to their gain controls
        this.membraneVoices.forEach(voice => voice.connect(this.membraneGain));
        this.noiseVoices.forEach(voice => voice.connect(this.noiseGain));
        
        // Mix components together
        this.mixer = new Tone.Gain();
        this.membraneGain.connect(this.mixer);
        this.noiseGain.connect(this.mixer);
        
        // Update routing based on power states
        this.updateSignalRouting();
        
        // Set up filter envelope modulation
        this.filterEnvelopeScale = new Tone.Scale(
            this.patch.filterEnvelope.baseFrequency, 
            this.patch.filterEnvelope.baseFrequency * Math.pow(2, this.patch.filterEnvelope.octaves)
        );
        
        this.filterEnvelope.connect(this.filterEnvelopeScale);
        this.filterEnvelopeScale.connect(this.filter.frequency);
    }

    // Update signal routing based on power states (filter and compressor only)
    updateSignalRouting() {
        // Disconnect everything first
        this.mixer.disconnect();
        this.filter.disconnect();
        this.compressor.disconnect();
        
        let currentNode = this.mixer;
        
        // Route through filter if powered on
        if (this.patch.power.filter) {
            currentNode.connect(this.filter);
            currentNode = this.filter;
        }
        
        // Route through compressor if powered on
        if (this.patch.power.compressor) {
            currentNode.connect(this.compressor);
            currentNode = this.compressor;
        }
        
        // Connect final node to master volume
        currentNode.connect(this.masterVolume);
    }

    recreateMembraneVoices() {
        this.membraneVoices.forEach(voice => voice.dispose());
        
        this.membraneVoices = [
            new Tone.MembraneSynth(this.patch.membrane),
            new Tone.MembraneSynth(this.patch.membrane)
        ];
        
        this.membraneVoices.forEach(voice => voice.connect(this.membraneGain));
    }

    recreateNoiseVoices() {
        this.noiseVoices.forEach(voice => voice.dispose());
        
        this.noiseVoices = [
            new Tone.NoiseSynth(this.patch.noise),
            new Tone.NoiseSynth(this.patch.noise)
        ];
        
        this.noiseVoices.forEach(voice => voice.connect(this.noiseGain));
    }

    // Apply parameter changes to the synthesizer
    applyParameter(path, value) {
        const parts = path.split('.');
        const component = parts[0];
        const paramPath = parts.slice(1).join('.');
        
        switch (component) {
            case 'power':
                // Only filter and compressor can be powered on/off
                if (paramPath === 'filter' || paramPath === 'compressor') {
                    this.updateSignalRouting();
                }
                break;
                
            case 'membrane':
                if (paramPath === 'oscillator.type') {
                    this.recreateMembraneVoices();
                } else {
                    // Apply to all membrane voices
                    const paramParts = paramPath.split('.');
                    if (paramParts.length === 2) {
                        const [section, param] = paramParts;
                        this.membraneVoices.forEach(voice => {
                            voice.set({ [section]: { [param]: value } });
                        });
                    } else {
                        this.membraneVoices.forEach(voice => {
                            voice.set({ [paramPath]: value });
                        });
                    }
                }
                break;
                
            case 'noise':
                if (paramPath === 'noise.type' || paramPath === 'noise.playbackRate') {
                    this.recreateNoiseVoices();
                } else {
                    // Apply to all noise voices
                    const paramParts = paramPath.split('.');
                    if (paramParts.length === 2) {
                        const [section, param] = paramParts;
                        this.noiseVoices.forEach(voice => {
                            voice.set({ [section]: { [param]: value } });
                        });
                    } else {
                        this.noiseVoices.forEach(voice => {
                            voice.set({ [paramPath]: value });
                        });
                    }
                }
                break;
                
            case 'mix':
                if (paramPath === 'crossfade') {
                    this.membraneGain.gain.value = 1 - value;
                    this.noiseGain.gain.value = value;
                }
                break;
                
            case 'filter':
                this.filter.set({ [paramPath]: value });
                break;
                
            case 'filterEnvelope':
                this.filterEnvelope.set({ [paramPath]: value });
                if (paramPath === 'baseFrequency' || paramPath === 'octaves') {
                    const baseFreq = this.patch.filterEnvelope.baseFrequency;
                    const octaves = this.patch.filterEnvelope.octaves;
                    this.filterEnvelopeScale.min = baseFreq;
                    this.filterEnvelopeScale.max = baseFreq * Math.pow(2, octaves);
                }
                break;
                
            case 'compressor':
                this.compressor.set({ [paramPath]: value });
                break;
        }
    }

    // Apply all settings from current patch
    applyAllSettings() {
        // Apply to all components
        this.membraneVoices.forEach(voice => voice.set(this.patch.membrane));
        this.noiseVoices.forEach(voice => voice.set(this.patch.noise));
        this.filter.set(this.patch.filter);
        this.filterEnvelope.set(this.patch.filterEnvelope);
        this.compressor.set(this.patch.compressor);
        
        // Update filter envelope scale
        const baseFreq = this.patch.filterEnvelope.baseFrequency;
        const octaves = this.patch.filterEnvelope.octaves;
        this.filterEnvelopeScale.min = baseFreq;
        this.filterEnvelopeScale.max = baseFreq * Math.pow(2, octaves);
        
        // Update mix levels
        const crossfade = this.patch.mix.crossfade;
        this.membraneGain.gain.value = 1 - crossfade;
        this.noiseGain.gain.value = crossfade;
        
        // Update signal routing
        this.updateSignalRouting();
    }

    // Trigger drum sound
    trigger(time = Tone.now(), pitch = null) {
        const triggerPitch = pitch || this.patch.pitch;
        const velocity = 1.0;
        
        const crossfade = this.patch.mix.crossfade;
        const membraneLevel = 1 - crossfade;
        const noiseLevel = crossfade;
        
        // Trigger membrane if audible (always on)
        if (membraneLevel > 0.01) {
            this.membraneVoices[this.membraneVoiceIndex].triggerAttackRelease(
                triggerPitch, '16n', time, velocity
            );
            this.membraneVoiceIndex = (this.membraneVoiceIndex + 1) % this.membraneVoices.length;
        }
        
        // Trigger noise if audible (always on)
        if (noiseLevel > 0.01) {
            this.noiseVoices[this.noiseVoiceIndex].triggerAttackRelease(
                '16n', time, velocity
            );
            this.noiseVoiceIndex = (this.noiseVoiceIndex + 1) % this.noiseVoices.length;
        }
        
        // Trigger filter envelope if filter is powered
        if (this.patch.power.filter) {
            this.filterEnvelope.triggerAttackRelease('16n', time);
        }
    }

    // Cleanup
    dispose() {
        this.membraneVoices.forEach(synth => synth.dispose());
        this.noiseVoices.forEach(synth => synth.dispose());
        this.membraneGain.dispose();
        this.noiseGain.dispose();
        this.mixer.dispose();
        this.filter.dispose();
        this.filterEnvelope.dispose();
        this.filterEnvelopeScale.dispose();
        this.compressor.dispose();
        super.dispose();
    }
} 