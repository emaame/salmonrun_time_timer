class AlertSound {
    constructor() {
    }

    _createAudioContext() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        return new AudioContext();
    }
    _createOscillator(context) {
        var oscillator = context.createOscillator();
        
        // for legacy browsers
        oscillator.start = oscillator.start || oscillator.noteOn;
        oscillator.stop  = oscillator.stop  || oscillator.noteOff;
        context.createGain = context.createGain || context.createGainNode;
        return oscillator;
    }

    _play_oscillator(freq, start, duration) {
        const context = this._createAudioContext();
        var oscillator = this._createOscillator(context);
        
        // set oscillator parameters
        oscillator.type = (typeof oscillator.type === "string") ? "sine" : 0;  // Sine wave
        oscillator.frequency.value = freq;

        // Create the instance of GainNode
        const gain = context.createGain();

        // OscillatorNode (Input) -> GainNode (Volume) -> AudioDestinationNode (Output)
        oscillator.connect(gain);
        gain.connect(context.destination);
        // Start sound
        oscillator.start(start);
        oscillator.stop(start + duration);
    }
    play_melody(start, melody)
    {
        const context = this._createAudioContext();
        // Create the instance of GainNode
        const gain = context.createGain();

        for(var i in melody) {
            var oscillator = this._createOscillator(context);
            // set oscillator parameters
            const note = melody[i];
            oscillator.type = (typeof oscillator.type === "string") ? "sine" : 0;  // Sine wave
            oscillator.frequency.value = note.freq;
    
            // OscillatorNode (Input) -> GainNode (Volume) -> AudioDestinationNode (Output)
            oscillator.connect(gain);
            gain.connect(context.destination);
            // Start sound
            oscillator.start(start);
            oscillator.stop(start + note.duration);
            start += note.duration;
        }
    }

}

export default AlertSound;