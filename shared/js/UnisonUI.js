/**
 * ============================================================================
 * UNISON UI LIBRARY
 * ============================================================================
 * 
 * User interface and interaction library for the UNISON synthesizer suite.
 * Contains UI components, keyboard input, patch management, and application initialization.
 * 
 * Author: UNISON Development Team
 * Version: 2.0 (Split from UnisonCore)
 * ============================================================================
 */

// ============================================================================
// MOBILE AUDIO OVERLAY SYSTEM
// ============================================================================

/**
 * Mobile Audio Overlay - Handles audio context activation for mobile devices
 */
class MobileAudioOverlay {
    constructor() {
        this.overlay = null;
        this.isAudioEnabled = false;
        this.isMobile = this.detectMobile();
    }
    
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    }
    
    async initialize() {
        // Only show overlay on mobile devices
        if (!this.isMobile) {
            this.isAudioEnabled = true;
            return;
        }
        
        // Check if audio context is already running
        if (typeof Tone !== 'undefined' && Tone.context.state === 'running') {
            this.isAudioEnabled = true;
            return;
        }
        
        this.createOverlay();
        this.showOverlay();
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'mobile-audio-overlay';
        this.overlay.innerHTML = `
            <div class="audio-overlay-content">
                <div class="audio-overlay-icon">🔊</div>
                <h2>Tap to Enable Audio</h2>
                <p>Audio requires user interaction on mobile devices</p>
                <button class="audio-enable-button">Enable Audio</button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #mobile-audio-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
            }
            
            .audio-overlay-content {
                text-align: center;
                color: white;
                padding: 2rem;
                max-width: 300px;
            }
            
            .audio-overlay-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: pulse 2s infinite;
            }
            
            .audio-overlay-content h2 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
                font-weight: 300;
            }
            
            .audio-overlay-content p {
                margin: 0 0 2rem 0;
                opacity: 0.8;
                font-size: 0.9rem;
            }
            
            .audio-enable-button {
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                border: none;
                color: white;
                padding: 1rem 2rem;
                font-size: 1.1rem;
                border-radius: 50px;
                cursor: pointer;
                transition: transform 0.2s ease;
                font-weight: 500;
            }
            
            .audio-enable-button:hover {
                transform: scale(1.05);
            }
            
            .audio-enable-button:active {
                transform: scale(0.95);
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(this.overlay);
        
        // Add event listeners
        const enableButton = this.overlay.querySelector('.audio-enable-button');
        enableButton.addEventListener('click', () => this.enableAudio());
        
        // Also allow clicking anywhere on overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.enableAudio();
            }
        });
    }
    
    async enableAudio() {
        try {
            // Start Tone.js audio context
            if (typeof Tone !== 'undefined') {
                await Tone.start();
                console.log('Audio context started successfully');
            }
            
            this.isAudioEnabled = true;
            this.hideOverlay();
            
            // Dispatch custom event to notify app that audio is ready
            window.dispatchEvent(new CustomEvent('audioEnabled'));
            
        } catch (error) {
            console.error('Failed to enable audio:', error);
            
            // Update overlay to show error
            const content = this.overlay.querySelector('.audio-overlay-content');
            content.innerHTML = `
                <div class="audio-overlay-icon">⚠️</div>
                <h2>Audio Error</h2>
                <p>Failed to enable audio. Please try again.</p>
                <button class="audio-enable-button" onclick="location.reload()">Reload Page</button>
            `;
        }
    }
    
    showOverlay() {
        if (this.overlay) {
            this.overlay.style.display = 'flex';
        }
    }
    
    hideOverlay() {
        if (this.overlay) {
            this.overlay.style.display = 'none';
        }
    }
    
    isEnabled() {
        return this.isAudioEnabled;
    }
}

// ============================================================================
// UI COMPONENT SYSTEM
// ============================================================================

/**
 * UNISON UI Component System
 * Provides factory methods and helpers for consistent UI creation
 */
class UnisonUI {
    /**
     * Create a parameter update handler that connects UI to audio engine
     */
    static createParameterHandler(controller, paramPath, displayEl, formatter) {
        return function(e) {
            const value = e.target.type === 'range' 
                ? parseFloat(e.target.value) 
                : e.target.value;
            
            controller.updateParameter(paramPath, value);
            
            if (displayEl) {
                const displayValue = formatter ? formatter(value) : value;
                displayEl.textContent = displayValue;
            }
        };
    }
    
    /**
     * Standard formatters for displaying values
     */
    static formatters = {
        fixed1: (v) => v.toFixed(1),
        fixed2: (v) => v.toFixed(2),
        fixed3: (v) => v.toFixed(3),
        integer: (v) => Math.round(v),
        frequency: (v) => Math.round(v) + 'Hz',
        percentage: (v) => Math.round(v * 100) + '%',
        db: (v) => Math.round(v) + 'dB'
    };
    
    /**
     * Create the 16-preset grid (standardized from 20 to 16)
     */
    static createPresetGrid() {
        const grid = document.createElement('div');
        grid.className = 'preset-grid';
        
        for (let i = 0; i < 16; i++) {
            const btn = document.createElement('button');
            btn.className = 'preset-button';
            btn.dataset.preset = i;
            btn.textContent = (i + 1).toString();
            grid.appendChild(btn);
        }
        
        return grid;
    }
    
    /**
     * Initialize power button handlers (drum synth only)
     * Only for filter and compressor modules, not synthesis sources
     */
    static initializePowerButtons(controller) {
        const powerFilter = document.getElementById('power-filter');
        const powerCompressor = document.getElementById('power-compressor');
        
        if (powerFilter) {
            powerFilter.addEventListener('click', function() {
                const currentState = controller.patch.power.filter;
                const newState = !currentState;
                
                controller.updateParameter('power.filter', newState);
                
                this.classList.toggle('on', newState);
                this.classList.toggle('off', !newState);
            });
        }
        
        if (powerCompressor) {
            powerCompressor.addEventListener('click', function() {
                const currentState = controller.patch.power.compressor;
                const newState = !currentState;
                
                controller.updateParameter('power.compressor', newState);
                
                this.classList.toggle('on', newState);
                this.classList.toggle('off', !newState);
            });
        }
    }
    
    /**
     * Update all UI controls from patch data
     */
    static updateControlsFromPatch(patch, mappings) {
        mappings.forEach(mapping => {
            const value = this.getNestedValue(patch, mapping.path);
            if (value === undefined) return;
            
            // Update the control element
            if (mapping.elementId) {
                const element = document.getElementById(mapping.elementId);
                if (element) {
                    element.value = mapping.transform 
                        ? mapping.transform(value) 
                        : value;
                }
            }
            
            // Update the display element
            if (mapping.displayId) {
                const display = document.getElementById(mapping.displayId);
                if (display) {
                    const displayValue = mapping.formatter 
                        ? mapping.formatter(value) 
                        : value;
                    display.textContent = displayValue;
                }
            }
        });
    }
    
    /**
     * Get nested object value by dot notation path
     */
    static getNestedValue(obj, path) {
        return path.split('.').reduce((curr, part) => curr?.[part], obj);
    }
}

// ============================================================================
// KEYBOARD INPUT SYSTEM
// ============================================================================

/**
 * UNISON Keyboard Component
 * Shared keyboard implementation for mono and FM synthesizers
 */
class UnisonKeyboard {
    static initialize(controller, octaveControl) {
        // Map computer keyboard keys to musical notes
        const keyMap = {
            'a': 'C', 'w': 'C#', 's': 'D', 'e': 'D#', 'd': 'E', 'f': 'F',
            't': 'F#', 'g': 'G', 'y': 'G#', 'h': 'A', 'u': 'A#', 'j': 'B'
        };
        
        let currentOctave = 4;
        const activeNotes = {};
        
        // Initialize octave control
        const octaveInput = document.getElementById('current-octave');
        const octaveDisplay = document.getElementById('octave-display');
        
        if (octaveInput) {
            octaveInput.addEventListener('input', function() {
                currentOctave = parseInt(this.value);
                if (octaveDisplay) {
                    octaveDisplay.textContent = currentOctave;
                }
            });
        }
        
        // Handle mouse/touch events for on-screen keyboard
        const keys = document.querySelectorAll('.white-key, .black-key');
        keys.forEach(key => {
            key.addEventListener('mousedown', function(e) {
                e.preventDefault();
                const note = this.dataset.note + currentOctave;
                controller.noteOn(note);
                this.classList.add('active');
            });
            
            key.addEventListener('mouseup', function(e) {
                e.preventDefault();
                const note = this.dataset.note + currentOctave;
                if (controller.patch.voiceMode === 'poly') {
                    controller.noteOff(note);
                } else {
                    controller.noteOff();
                }
                this.classList.remove('active');
            });
        });
        
        // Handle computer keyboard events
        document.addEventListener('keydown', function(e) {
            const key = e.key.toLowerCase();
            if (keyMap[key] && !activeNotes[key]) {
                const note = keyMap[key] + currentOctave;
                controller.noteOn(note);
                activeNotes[key] = true;
                
                const keyElement = document.querySelector(`[data-note="${keyMap[key]}"]`);
                if (keyElement) {
                    keyElement.classList.add('active');
                }
            }
        });
        
        document.addEventListener('keyup', function(e) {
            const key = e.key.toLowerCase();
            if (keyMap[key]) {
                const note = keyMap[key] + currentOctave;
                
                if (controller.patch.voiceMode === 'poly') {
                    controller.noteOff(note);
                } else {
                    controller.noteOff();
                }
                
                activeNotes[key] = false;
                
                const keyElement = document.querySelector(`[data-note="${keyMap[key]}"]`);
                if (keyElement) {
                    keyElement.classList.remove('active');
                }
            }
        });
    }
}

// ============================================================================
// PATCH MANAGEMENT SYSTEM
// ============================================================================

/**
 * UNISON Patch Management System - Local Version
 * Handles save/load operations using global preset variables instead of fetch
 * Works with file:// protocol without CORS issues
 */
class UnisonPatchManager {
    constructor(controller, synthType, config) {
        this.controller = controller;
        this.synthType = synthType;
        this.updateUICallback = config.updateUICallback;
        this.randomizeFunction = config.randomizeFunction;
        
        this.presets = [];
        this.currentPresetIndex = null;
        
        // Load presets from global variables
        this.loadPresets();
    }
    
    /**
     * Load presets from global variables (no fetch required)
     */
    loadPresets() {
        try {
            // Get presets from the appropriate global variable
            let globalPresets;
            switch(this.synthType) {
                case 'mono':
                    globalPresets = window.monoPresets;
                    break;
                case 'fm':
                    globalPresets = window.fmPresets;
                    break;
                case 'drum':
                    globalPresets = window.drumPresets;
                    break;
                default:
                    throw new Error(`Unknown synth type: ${this.synthType}`);
            }
            
            if (!globalPresets) {
                throw new Error(`Global presets not found for ${this.synthType}`);
            }
            
            this.presets = globalPresets;
            console.log(`Loaded ${this.presets.length} ${this.synthType} presets`);
            
            // Load first preset by default
            if (this.presets.length > 0) {
                setTimeout(() => this.loadPreset(0), 100);
            }
        } catch (error) {
            console.error(`Error loading ${this.synthType} presets:`, error);
            this.presets = [];
        }
    }
    
    /**
     * Get preset data for the current synth type
     */
    getPresetData() {
        return this.presets;
    }
    
    /**
     * Get all presets
     */
    getPresets() {
        return this.presets;
    }
    
    /**
     * Get a specific preset by index
     */
    getPreset(index) {
        if (index >= 0 && index < this.presets.length) {
            return this.presets[index];
        }
        return null;
    }
    
    /**
     * Get a random preset
     */
    getRandomPreset() {
        if (this.presets.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.presets.length);
        return this.presets[randomIndex];
    }
    
    /**
     * Save current patch to file
     */
    savePatch() {
        const patch = this.controller.getPatch();
        const patchData = {
            instrument: `UNISON ${this.synthType.toUpperCase()}`,
            timestamp: new Date().toISOString(),
            patch: patch
        };
        
        const json = JSON.stringify(patchData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.synthType}-patch-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    /**
     * Load patch from file
     */
    loadPatchFromFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const patch = data.patch || data; // Support both wrapped and direct formats
                
                if (this.controller.applyPatch(patch)) {
                    this.updateUICallback(patch);
                    this.currentPresetIndex = null; // Clear preset selection
                    this.updatePresetButtons();
                }
            } catch (error) {
                console.error('Error loading patch:', error);
                alert('Error loading patch file');
            }
        };
        
        reader.readAsText(file);
    }
    
    /**
     * Load a preset by index (0-15)
     */
    loadPreset(index) {
        if (index < 0 || index >= this.presets.length) {
            console.error('Invalid preset index:', index);
            return;
        }
        
        let preset = JSON.parse(JSON.stringify(this.presets[index]));
        
        // For drum presets, extract the patch property if it exists
        if (this.synthType === 'drum' && preset.patch) {
            preset = preset.patch;
        }
        
        if (this.controller.applyPatch(preset)) {
            this.updateUICallback(preset);
            this.currentPresetIndex = index;
            this.updatePresetButtons();
        }
    }
    
    /**
     * Update preset button active states
     */
    updatePresetButtons() {
        document.querySelectorAll('.preset-button').forEach((btn, i) => {
            btn.classList.toggle('active', i === this.currentPresetIndex);
        });
    }
    
    /**
     * Randomize patch using synthesizer-specific function
     */
    randomizePatch() {
        const patch = this.randomizeFunction(this.controller.getPatch());
        
        if (this.controller.applyPatch(patch)) {
            this.updateUICallback(patch);
            this.currentPresetIndex = null;
            this.updatePresetButtons();
        }
    }
    
    /**
     * Initialize UI bindings for patch management
     */
    initializeUI() {
        // Bind patch management buttons
        const randomBtn = document.getElementById('randomize-btn');
        const saveBtn = document.getElementById('save-btn');
        const loadBtn = document.getElementById('load-btn');
        const fileInput = document.getElementById('patch-file-input');
        
        if (randomBtn) {
            randomBtn.addEventListener('click', () => this.randomizePatch());
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePatch());
        }
        
        if (loadBtn && fileInput) {
            loadBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    this.loadPatchFromFile(e.target.files[0]);
                }
            });
        }
        
        // Bind preset buttons
        document.querySelectorAll('.preset-button').forEach((btn, i) => {
            btn.addEventListener('click', () => this.loadPreset(i));
        });
    }
}

// ============================================================================
// SYNTHESIZER-SPECIFIC UI HELPER FUNCTIONS
// ============================================================================

// MONO Synthesizer UI Helper Functions
function handleMonoBaseFrequency(e, control, valueDisplay) {
    const position = parseInt(e.target.value);
    const frequency = UnisonCore.audio.sliderPositionToFreq(position);
    
    this.controller.updateParameter('filterEnvelope.baseFrequency', frequency);
    
    if (valueDisplay) {
        valueDisplay.textContent = UnisonUI.formatters.frequency(frequency);
    }
}

function setupMonoVoiceModeControls() {
    const voiceModeButtons = document.querySelectorAll('.voice-mode-button');
    
    voiceModeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            this.controller.updateParameter('voiceMode', mode);
            
            voiceModeButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === mode);
            });
        });
    });
}

function setupMonoWaveformVisibility() {
    const waveformSelect = document.getElementById('waveform');
    if (waveformSelect) {
        waveformSelect.addEventListener('change', updateMonoControlVisibility);
    }
}

function updateMonoControlVisibility() {
    const waveform = document.getElementById('waveform');
    if (!waveform) return;
    
    const waveType = waveform.value;
    const pulseControls = document.querySelector('.pulse-controls');
    const fatControls = document.querySelector('.fat-controls');
    const spreadControl = document.querySelector('.spread-control');
    
    if (pulseControls) {
        pulseControls.style.display = (waveType === 'pulse' || waveType === 'fatpulse') ? 'flex' : 'none';
    }
    if (fatControls) {
        fatControls.style.display = waveType.startsWith('fat') ? 'flex' : 'none';
    }
    if (spreadControl) {
        spreadControl.style.display = (waveType === 'fatsawtooth') ? 'flex' : 'none';
    }
}

function updateMonoSpecificUI(patch) {
    const voiceModeButtons = document.querySelectorAll('.voice-mode-button');
    voiceModeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === patch.voiceMode);
    });
    
    const baseFreqControl = document.getElementById('baseFreq');
    const baseFreqDisplay = document.getElementById('baseFreq-value');
    if (baseFreqControl && patch.filterEnvelope?.baseFrequency) {
        const position = UnisonCore.audio.freqToSliderPosition(patch.filterEnvelope.baseFrequency);
        baseFreqControl.value = position;
        if (baseFreqDisplay) {
            baseFreqDisplay.textContent = UnisonUI.formatters.frequency(patch.filterEnvelope.baseFrequency);
        }
    }
    
    updateMonoControlVisibility();
}

// FM Synthesizer UI Helper Functions
function setupFMVoiceModeControls() {
    const voiceModeButtons = document.querySelectorAll('.voice-mode-button');
    
    voiceModeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            this.controller.updateParameter('voiceMode', mode);
            
            voiceModeButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === mode);
            });
        });
    });
}

function updateFMSpecificUI(patch) {
    const voiceModeButtons = document.querySelectorAll('.voice-mode-button');
    voiceModeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === patch.voiceMode);
    });
}

// DRUM Synthesizer UI Helper Functions
function handleDrumFilterFrequency(e, control, valueDisplay) {
    const position = parseInt(e.target.value);
    const frequency = UnisonCore.audio.sliderPositionToFreq(position, 200, 8000);
    
    this.controller.updateParameter('filter.frequency', frequency);
    
    if (valueDisplay) {
        valueDisplay.textContent = Math.round(frequency) + 'Hz';
    }
}

function setupDrumPowerButtons() {
    const filterPowerBtn = document.getElementById('power-filter');
    const compressorPowerBtn = document.getElementById('power-compressor');
    
    if (filterPowerBtn) {
        filterPowerBtn.addEventListener('click', () => {
            const currentState = this.controller.patch.power.filter;
            const newState = !currentState;
            
            this.controller.updateParameter('power.filter', newState);
            
            filterPowerBtn.classList.toggle('on', newState);
            filterPowerBtn.classList.toggle('off', !newState);
        });
    }
    
    if (compressorPowerBtn) {
        compressorPowerBtn.addEventListener('click', () => {
            const currentState = this.controller.patch.power.compressor;
            const newState = !currentState;
            
            this.controller.updateParameter('power.compressor', newState);
            
            compressorPowerBtn.classList.toggle('on', newState);
            compressorPowerBtn.classList.toggle('off', !newState);
        });
    }
}

function setupDrumPad() {
    const drumPad = document.getElementById('main-drum-pad');
    
    if (drumPad) {
        drumPad.addEventListener('click', () => {
            drumPad.classList.add('active');
            this.controller.trigger();
            
            setTimeout(() => {
                drumPad.classList.remove('active');
            }, 100);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                drumPad.classList.add('active');
                this.controller.trigger();
                
                setTimeout(() => {
                    drumPad.classList.remove('active');
                }, 100);
            }
        });
    }
}

function updateDrumSpecificUI(patch) {
    const filterPowerBtn = document.getElementById('power-filter');
    const compressorPowerBtn = document.getElementById('power-compressor');
    
    if (filterPowerBtn && patch.power?.filter !== undefined) {
        filterPowerBtn.classList.toggle('on', patch.power.filter);
        filterPowerBtn.classList.toggle('off', !patch.power.filter);
    }
    
    if (compressorPowerBtn && patch.power?.compressor !== undefined) {
        compressorPowerBtn.classList.toggle('on', patch.power.compressor);
        compressorPowerBtn.classList.toggle('off', !patch.power.compressor);
    }
    
    const baseFreqControl = document.getElementById('baseFreq');
    const baseFreqDisplay = document.getElementById('baseFreq-value');
    if (baseFreqControl && patch.filter?.frequency) {
        const position = UnisonCore.audio.freqToSliderPosition(patch.filter.frequency, 200, 8000);
        baseFreqControl.value = position;
        if (baseFreqDisplay) {
            baseFreqDisplay.textContent = Math.round(patch.filter.frequency) + 'Hz';
        }
    }
}

// ============================================================================
// SYNTHESIZER UI CONFIGURATION OBJECTS
// ============================================================================

/**
 * Configuration object for MONO synthesizer UI
 */
const MONO_CONFIG = {
    hasKeyboard: true,
    randomizeFunction: UnisonRandomizer.randomMono,
    
    // Merge audio parameters with UI-specific settings
    parameters: MONO_AUDIO_CONFIG.parameters,
    
    // Special control setup functions
    specialControls: [
        setupMonoVoiceModeControls,
        setupMonoWaveformVisibility
    ],
    
    // Custom UI update function
    customUIUpdate: updateMonoSpecificUI,
    
    // Synth-specific initialization
    specificInit: function() {
        updateMonoControlVisibility();
    }
};

/**
 * Configuration object for FM synthesizer UI
 */
const FM_CONFIG = {
    hasKeyboard: true,
    randomizeFunction: UnisonRandomizer.randomFM,
    
    // Merge audio parameters with UI-specific settings
    parameters: FM_AUDIO_CONFIG.parameters,
    
    // Special control setup functions
    specialControls: [
        setupFMVoiceModeControls
    ],
    
    // Custom UI update function
    customUIUpdate: updateFMSpecificUI
};

/**
 * Configuration object for DRUM synthesizer UI
 */
const DRUM_CONFIG = {
    hasKeyboard: false, // Drum synth doesn't use keyboard
    randomizeFunction: UnisonRandomizer.randomDrum,
    
    // Merge audio parameters with UI-specific settings
    parameters: DRUM_AUDIO_CONFIG.parameters,
    
    // Special control setup functions
    specialControls: [
        setupDrumPowerButtons,
        setupDrumPad
    ],
    
    // Custom UI update function
    customUIUpdate: updateDrumSpecificUI
};

// ============================================================================
// UNIFIED APP INITIALIZATION SYSTEM
// ============================================================================

/**
 * UNISON App - Unified Application Initializer
 * Handles common initialization for all synthesizer types
 */
class UnisonApp {
    constructor(synthType, controllerClass, config) {
        this.synthType = synthType;
        this.controllerClass = controllerClass;
        this.config = config;
        this.controller = null;
        this.patchManager = null;
        this.audioOverlay = new MobileAudioOverlay();
    }

    async initialize() {
        try {
            // Initialize mobile audio overlay first
            await this.audioOverlay.initialize();
            
            // Wait for audio to be enabled on mobile
            if (!this.audioOverlay.isEnabled()) {
                await new Promise(resolve => {
                    window.addEventListener('audioEnabled', resolve, { once: true });
                });
            }
            
            // Start Tone.js (should already be started by overlay on mobile)
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }
            console.log('Tone.js started');

            // Create controller
            this.controller = new this.controllerClass();
            
            // Create patch manager
            this.patchManager = new UnisonPatchManager(this.controller, this.synthType, {
                updateUICallback: () => this.updateUIFromPatch(),
                randomizeFunction: this.config.randomizeFunction
            });
            
            // Initialize keyboard (if needed)
            if (this.config.hasKeyboard) {
                UnisonKeyboard.initialize(this.controller, null);
            }
            
            // Initialize UI components
            this.initializeUI();
            
            // Setup presets
            this.setupPresetGrid();
            
            // Setup global controls
            this.setupGlobalControls();
            
            // Synth-specific initialization
            if (this.config.specificInit) {
                this.config.specificInit.call(this);
            }
            
            // Initialize patch manager UI
            this.patchManager.initializeUI();
            
            // Update UI to reflect initial patch
            this.updateUIFromPatch();
            
            console.log(`${this.synthType} synthesizer initialized`);
            
        } catch (error) {
            console.error(`Failed to initialize ${this.synthType} synthesizer:`, error);
        }
    }

    initializeUI() {
        // Setup parameter controls from config
        this.config.parameters.forEach(param => {
            this.setupParameterControl(
                param.controlId,
                param.path,
                param.eventType || 'input',
                param.formatter,
                param.customHandler
            );
        });
        
        // Setup any special controls
        if (this.config.specialControls) {
            this.config.specialControls.forEach(setup => setup.call(this));
        }
    }

    setupParameterControl(controlId, paramPath, eventType, formatter = null, customHandler = null) {
        const control = document.getElementById(controlId);
        const valueDisplay = document.getElementById(controlId + '-value');
        
        if (!control) {
            console.warn(`Control not found: ${controlId}`);
            return;
        }

        if (customHandler) {
            // Look up custom handler by name
            const handlerMap = {
                'handleMonoBaseFrequency': handleMonoBaseFrequency,
                'handleDrumFilterFrequency': handleDrumFilterFrequency
            };
            
            const handlerFunction = handlerMap[customHandler];
            if (handlerFunction) {
                control.addEventListener(eventType, (e) => handlerFunction.call(this, e, control, valueDisplay));
            }
            return;
        }

        control.addEventListener(eventType, (e) => {
            let value;
            
            // Unified value parsing
            if (control.type === 'checkbox') {
                value = e.target.checked;
            } else if (control.tagName === 'SELECT' || eventType === 'change') {
                value = e.target.value;
            } else if (control.type === 'range') {
                const step = parseFloat(control.step) || 0.01;
                value = step >= 1 ? parseInt(e.target.value) : parseFloat(e.target.value);
            } else {
                value = e.target.value;
            }
            
            // Update the synthesizer parameter
            this.controller.updateParameter(paramPath, value);
            
            // Update display if it exists
            if (valueDisplay && formatter) {
                valueDisplay.textContent = formatter(value);
            }
        });
    }

    setupPresetGrid() {
        const presetContainer = document.querySelector('.preset-grid');
        if (!presetContainer) return;
        
        presetContainer.innerHTML = '';
        
        // Create 16 preset buttons
        for (let i = 0; i < 16; i++) {
            const button = document.createElement('button');
            button.className = 'preset-button';
            button.dataset.preset = i;
            button.textContent = (i + 1).toString();
            button.addEventListener('click', () => {
                this.patchManager.loadPreset(i);
            });
            presetContainer.appendChild(button);
        }
    }

    setupGlobalControls() {
        const randomBtn = document.getElementById('randomize-btn') || document.getElementById('randomize');
        if (randomBtn) {
            randomBtn.addEventListener('click', () => {
                this.patchManager.randomizePatch();
            });
        }
        
        const saveBtn = document.getElementById('save-btn') || document.getElementById('save-patch');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.patchManager.savePatch();
            });
        }
        
        const loadBtn = document.getElementById('load-btn') || document.getElementById('load-patch');
        const fileInput = document.getElementById('patch-file-input') || document.getElementById('load-input');
        if (loadBtn && fileInput) {
            loadBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    this.patchManager.loadPatchFromFile(e.target.files[0]);
                    e.target.value = ''; // Clear for re-selection
                }
            });
        }
    }

    updateUIFromPatch() {
        if (!this.controller) return;
        
        const patch = this.controller.getPatch();
        
        // Update standard controls
        this.config.parameters.forEach(param => {
            if (param.updateFromPatch !== false) {
                this.updateControlFromPatch(
                    param.controlId,
                    this.getNestedValue(patch, param.path),
                    param.formatter
                );
            }
        });
        
        // Custom UI updates
        if (this.config.customUIUpdate) {
            this.config.customUIUpdate.call(this, patch);
        }
    }

    updateControlFromPatch(controlId, value, formatter = null) {
        const control = document.getElementById(controlId);
        const valueDisplay = document.getElementById(controlId + '-value');
        
        if (control && value !== undefined) {
            control.value = value;
        }
        
        if (valueDisplay && value !== undefined) {
            const displayValue = formatter ? formatter(value) : value;
            valueDisplay.textContent = displayValue;
        }
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((curr, part) => curr?.[part], obj);
    }
}

// ============================================================================
// INITIALIZATION AND EXPORTS
// ============================================================================

// Immediately make classes globally available (compatible with file:// protocol)
(function() {
    'use strict';
    
    // Attach all classes to window object immediately
    if (typeof window !== 'undefined') {
        window.MobileAudioOverlay = MobileAudioOverlay;
        window.UnisonUI = UnisonUI;
        window.UnisonKeyboard = UnisonKeyboard;
        window.UnisonPatchManager = UnisonPatchManager;
        window.UnisonApp = UnisonApp;
        
        // Export configuration objects
        window.MONO_CONFIG = MONO_CONFIG;
        window.FM_CONFIG = FM_CONFIG;
        window.DRUM_CONFIG = DRUM_CONFIG;
    }
    
    /**
     * Global initialization function for UNISON UI
     * Call this after DOM is loaded to ensure all systems are ready
     */
    function initializeUnisonUI() {
        // Ensure required dependencies are available
        if (typeof UnisonCore === 'undefined') {
            console.error('UnisonCore is required but not found. Please include UnisonAudio.js before UnisonUI.js');
            return false;
        }
        
        if (typeof Tone === 'undefined') {
            console.error('Tone.js is required but not found. Please include Tone.js before UNISON libraries');
            return false;
        }
        
        return true;
    }
    
    // Make initialization function globally available
    window.initializeUnisonUI = initializeUnisonUI;
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUnisonUI);
    } else {
        initializeUnisonUI();
    }
    
    console.log('🎹 UNISON UI Library loaded');
})(); 